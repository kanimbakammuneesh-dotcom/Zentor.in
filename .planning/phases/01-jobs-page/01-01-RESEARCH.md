# 01-01 RESEARCH: Cloudflare Workers + Hyperdrive Architecture

## RDS Connection

**Credentials:**
- Host: zentor-postgres.cz0sckkocuoa.ap-south-1.rds.amazonaws.com
- Port: 5432
- Database: zentor_prod
- Username: muneesh
- SSL Required

**Existing Table: job_postings**
| Column | Type |
|--------|------|
| id | UUID |
| title | VARCHAR(255) |
| company | VARCHAR(255) |
| company_logo_url | TEXT |
| location | VARCHAR(255) |
| job_type | VARCHAR(50) |
| is_remote | BOOLEAN |
| experience_years | INTEGER |
| salary_min | INTEGER |
| salary_max | INTEGER |
| salary_currency | VARCHAR(10) |
| skills | TEXT[] |
| description | TEXT |
| job_url | TEXT |
| job_url_direct | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

## Architecture

**Stack:**
- Cloudflare Worker with Hyperdrive
- node-postgres (pg@>8.16.3)
- KV namespace for caching (1-hour TTL)

**wrangler.toml:**
```toml
name = "zentor-jobs-api"
compatibility_date = "2026-04-17"
compatibility_flags = ["nodejs_compat"]

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<create-after-setup>"

[[kv_namespaces]]
binding = "JOBS_CACHE"
id = "<create-after-setup>"

[secrets]
DB_USERNAME
DB_PASSWORD
```

**Worker Code:**
```typescript
import { Client } from "pg";

export default {
  async fetch(request: Request, env: Env) {
    const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });
    await client.connect();
    // query...
    await client.end();
  }
}
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /jobs | List jobs (cached) |
| GET | /jobs/:id | Single job |
| POST | /jobs/refresh | Full cache refresh |
| POST | /jobs/sync?since=TIMESTAMP | Incremental sync |

## Caching Strategy (Updated: Cost-Optimized)

- KV key: "jobs:all" (7-day TTL)
- KV key: "jobs:last_sync" (timestamp)
- Manual trigger via /jobs/refresh
- Hourly cron (optional)

### Cost Optimization (per user requirements)

1. **7-Day Data Cutoff**: Only fetch jobs created in the last 7 days
   - WHERE created_at > NOW() - INTERVAL '7 days'
   - Excludes stale job postings to save query costs

2. **Incremental Sync**: Only fetch records updated AFTER last sync
   - WHERE updated_at > last_sync_timestamp
   - Combined with 7-day filter to avoid fetching all records

3. **7-Day Cache TTL**: Data cached for 7 days, not 1 hour
   - Reduces database query frequency
   - Cache key: jobs:all with 604800 second TTL