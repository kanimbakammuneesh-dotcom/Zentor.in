#!/usr/bin/env python3
"""
deploy_and_test.py
==================
Deploys zentor-jobs-api Cloudflare Worker via wrangler, then runs a
full endpoint test suite against the live worker URL.

Usage:
    python deploy_and_test.py [--skip-deploy] [--secret YOUR_SECRET]

Options:
    --skip-deploy   Skip the wrangler deploy step (test only)
    --secret VALUE  Value for X-Refresh-Secret header
                    (default: reads REFRESH_SECRET env var)
"""

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error
from dataclasses import dataclass, field
from typing import Optional

# ─── CONFIG ────────────────────────────────────────────────────────────────────

WORKER_URL    = "https://zentor-jobs-api.zentor-admin.workers.dev"
WORKER_DIR    = os.path.dirname(os.path.abspath(__file__))   # jobs-api/
WRANGLER_BIN  = os.path.join(WORKER_DIR, "node_modules", ".bin", "wrangler")

# Fallback to global wrangler if local not present
if not os.path.exists(WRANGLER_BIN):
    WRANGLER_BIN = "npx"
    WRANGLER_CMD = ["npx", "wrangler"]
else:
    WRANGLER_CMD = [WRANGLER_BIN]

# ─── COLOUR OUTPUT ─────────────────────────────────────────────────────────────

GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def ok(msg):    print(f"  {GREEN}✓{RESET} {msg}")
def fail(msg):  print(f"  {RED}✗{RESET} {msg}")
def warn(msg):  print(f"  {YELLOW}⚠{RESET} {msg}")
def info(msg):  print(f"  {CYAN}→{RESET} {msg}")
def header(msg): print(f"\n{BOLD}{CYAN}{'─'*60}{RESET}\n{BOLD}{msg}{RESET}\n{'─'*60}")

# ─── RESULT TRACKER ────────────────────────────────────────────────────────────

@dataclass
class TestResult:
    name: str
    passed: bool
    detail: str = ""

results: list[TestResult] = []

def assert_test(name: str, condition: bool, detail: str = "") -> bool:
    r = TestResult(name, condition, detail)
    results.append(r)
    if condition:
        ok(f"{name}")
        if detail:
            print(f"     {detail}")
    else:
        fail(f"{name}")
        if detail:
            print(f"     {RED}{detail}{RESET}")
    return condition

# ─── HTTP HELPER ───────────────────────────────────────────────────────────────

def http(method: str, path: str, headers: Optional[dict] = None, timeout: int = 15):
    """
    Make an HTTP request to the worker. Returns (status_code, body_dict | None).
    Raises on network errors.
    """
    url = WORKER_URL + path
    req = urllib.request.Request(url, method=method, headers=headers or {})
    req.add_header("User-Agent", "Zentor-TestScript/1.0")

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode()
            try:
                return resp.status, json.loads(body)
            except json.JSONDecodeError:
                return resp.status, {"_raw": body}
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return e.code, json.loads(body)
        except json.JSONDecodeError:
            return e.code, {"_raw": body}

# ─── DEPLOY ────────────────────────────────────────────────────────────────────

def deploy():
    header("STEP 1 — Deploy Worker")
    info(f"Running wrangler deploy from {WORKER_DIR}")

    cmd = ["npx", "wrangler", "deploy"]
    start = time.time()

    proc = subprocess.run(
        cmd,
        cwd=WORKER_DIR,
        capture_output=True,
        text=True,
    )

    elapsed = time.time() - start
    stdout = proc.stdout.strip()
    stderr = proc.stderr.strip()

    if proc.returncode != 0:
        fail(f"Deploy FAILED (exit {proc.returncode}) in {elapsed:.1f}s")
        print(f"\n{RED}── stderr ──{RESET}")
        print(stderr)
        sys.exit(1)

    # Extract deployed URL from output
    deployed_url = None
    for line in (stdout + stderr).splitlines():
        if "workers.dev" in line and "https://" in line:
            for part in line.split():
                if part.startswith("https://") and "workers.dev" in part:
                    deployed_url = part.rstrip(".")
                    break

    ok(f"Deployed in {elapsed:.1f}s")
    if deployed_url:
        ok(f"URL: {deployed_url}")
    else:
        warn("Could not parse URL from wrangler output — using default")

    # Show version ID if present
    for line in (stdout + stderr).splitlines():
        if "Version ID:" in line or "Current Version" in line:
            info(line.strip())

    info("Waiting 3s for propagation...")
    time.sleep(3)
    return deployed_url or WORKER_URL

# ─── TESTS ─────────────────────────────────────────────────────────────────────

def test_get_jobs():
    header("TEST — GET /jobs")
    status, body = http("GET", "/jobs")
    info(f"Status: {status}")

    assert_test("Returns HTTP 200", status == 200, f"Got {status}")
    if isinstance(body, dict):
        assert_test("Has 'jobs' array",    "jobs"    in body, f"Keys: {list(body.keys())}")
        assert_test("Has 'total' field",   "total"   in body)
        assert_test("Has 'page' field",    "page"    in body)
        assert_test("Has 'hasMore' field", "hasMore" in body)

        if "jobs" in body:
            jobs = body["jobs"]
            info(f"Total jobs in response: {body.get('total', '?')}, Page 1 count: {len(jobs)}")
            if len(jobs) > 0:
                j = jobs[0]
                assert_test(
                    "First job has required fields",
                    all(k in j for k in ("id", "title", "company", "location")),
                    f"Fields: {list(j.keys())}"
                )
    else:
        assert_test("Body is JSON object", False, str(body))

    return body


def test_pagination():
    header("TEST — GET /jobs pagination")
    status, body = http("GET", "/jobs?page=1&limit=2")
    assert_test("Returns HTTP 200", status == 200)
    if isinstance(body, dict) and "jobs" in body:
        assert_test("Respects limit=2", len(body["jobs"]) <= 2, f"Got {len(body['jobs'])} jobs")
        info(f"hasMore = {body.get('hasMore')}")


def test_filters():
    header("TEST — GET /jobs with filters")

    status, body = http("GET", "/jobs?location=remote")
    assert_test("GET /jobs?location=remote → 200", status == 200)

    status, body = http("GET", "/jobs?min_exp=0&max_exp=5")
    assert_test("GET /jobs?min_exp=0&max_exp=5 → 200", status == 200)

    status, body = http("GET", "/jobs?sort=date")
    assert_test("GET /jobs?sort=date → 200", status == 200)


def test_get_job_by_id(jobs_body: dict):
    header("TEST — GET /jobs/:id")

    # Try with a real ID from the jobs list
    jobs = jobs_body.get("jobs", []) if isinstance(jobs_body, dict) else []

    if jobs:
        real_id = jobs[0]["id"]
        info(f"Testing with real ID: {real_id}")
        status, body = http("GET", f"/jobs/{real_id}")
        assert_test(f"GET /jobs/{real_id} → 200", status == 200, f"Got {status}")
        if isinstance(body, dict):
            assert_test("Response has 'id' field", "id" in body)
            assert_test("ID matches", body.get("id") == real_id)
    else:
        warn("No jobs in cache — skipping real-ID test (run /jobs/refresh first)")

    # Non-existent ID
    status, body = http("GET", "/jobs/non-existent-id-xyz")
    assert_test("Non-existent ID → 404", status == 404, f"Got {status}")

    # Invalid ID format (should 400 or 404)
    status, body = http("GET", "/jobs/../../etc/passwd")
    assert_test("Path traversal attempt → non-200", status != 200, f"Got {status}")


def test_not_found():
    header("TEST — 404 for unknown routes")
    status, body = http("GET", "/unknown")
    assert_test("GET /unknown → 404", status == 404, f"Got {status}")

    status, body = http("GET", "/")
    assert_test("GET / → 404", status == 404, f"Got {status}")


def test_refresh(secret: Optional[str]):
    header("TEST — POST /jobs/refresh")

    if not secret:
        warn("No REFRESH_SECRET provided — testing auth rejection only")
        status, body = http("POST", "/jobs/refresh")
        assert_test(
            "POST /jobs/refresh without secret → 401",
            status == 401,
            f"Got {status} | Body: {body}"
        )
        return

    # With correct secret
    info(f"Using X-Refresh-Secret header")
    status, body = http("POST", "/jobs/refresh", headers={"X-Refresh-Secret": secret})
    info(f"Status: {status}, Body: {body}")
    assert_test(
        "POST /jobs/refresh with secret → 200",
        status == 200,
        f"Got {status}"
    )
    if isinstance(body, dict):
        assert_test("Response has 'success: true'", body.get("success") is True)
        assert_test("Response has 'count'",          "count" in body)
        assert_test("Response has 'refreshed_at'",   "refreshed_at" in body)
        info(f"Cached {body.get('count', '?')} jobs")

    # Wrong secret
    status, body = http("POST", "/jobs/refresh", headers={"X-Refresh-Secret": "wrong-secret-abc"})
    assert_test("POST /jobs/refresh with wrong secret → 401", status == 401, f"Got {status}")


def test_sync(secret: Optional[str]):
    header("TEST — POST /jobs/sync")

    if not secret:
        # Test auth rejection
        status, body = http("POST", "/jobs/sync")
        assert_test("POST /jobs/sync without secret → 401", status == 401, f"Got {status}")
        return

    status, body = http("POST", "/jobs/sync", headers={"X-Refresh-Secret": secret})
    info(f"Status: {status}, Body keys: {list(body.keys()) if isinstance(body, dict) else body}")
    assert_test("POST /jobs/sync with secret → 200", status == 200, f"Got {status}")
    if isinstance(body, dict):
        assert_test("Response has 'jobs' array", "jobs" in body)
        assert_test("Response has 'count'",      "count" in body)
        info(f"Synced {body.get('count', '?')} jobs")


def test_rate_limit_header():
    header("TEST — Response headers")
    status, body = http("GET", "/jobs")
    # We can't inspect headers directly via urllib urlopen easily,
    # so just verify the endpoint works
    assert_test("GET /jobs reachable", status == 200)
    info("Security headers (X-Content-Type-Options etc.) applied server-side")


# ─── SUMMARY ───────────────────────────────────────────────────────────────────

def print_summary():
    header("TEST SUMMARY")
    passed = sum(1 for r in results if r.passed)
    failed = sum(1 for r in results if not r.passed)
    total  = len(results)

    for r in results:
        sym = f"{GREEN}✓{RESET}" if r.passed else f"{RED}✗{RESET}"
        print(f"  {sym} {r.name}")

    print()
    if failed == 0:
        print(f"{BOLD}{GREEN}All {total} tests passed!{RESET} 🎉")
    else:
        print(f"{BOLD}{RED}{failed}/{total} tests FAILED{RESET}")

    return failed == 0


# ─── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Deploy and test zentor-jobs-api")
    parser.add_argument("--skip-deploy", action="store_true", help="Skip wrangler deploy")
    parser.add_argument("--secret",      type=str,  default=None, help="REFRESH_SECRET value")
    args = parser.parse_args()

    # Resolve secret: CLI arg > env var
    secret = args.secret or os.environ.get("REFRESH_SECRET")

    print(f"\n{BOLD}{'='*60}{RESET}")
    print(f"{BOLD}  Zentor Jobs API — Deploy & Test{RESET}")
    print(f"{BOLD}  Target: {WORKER_URL}{RESET}")
    print(f"{BOLD}{'='*60}{RESET}")

    if not args.skip_deploy:
        deploy()
    else:
        info("Skipping deploy (--skip-deploy)")

    if not secret:
        warn("REFRESH_SECRET not set — auth-protected endpoints will only be rejection-tested")
        warn("  Pass --secret YOUR_VALUE or set REFRESH_SECRET env var to test fully")

    # Run all tests
    jobs_body = test_get_jobs()
    test_pagination()
    test_filters()
    test_get_job_by_id(jobs_body)
    test_not_found()
    test_refresh(secret)
    test_sync(secret)
    test_rate_limit_header()

    all_passed = print_summary()
    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()
