# ROADMAP.md - Zentor Project Roadmap

## Project Vision
Zentor.in - Education platform for Gen Z students in India offering tech courses, college admissions, internships, and referral programs.

## Current Status
- **Phase**: 01 - Planning (Jobs Page with RDS Integration)
- **Milestone**: Building comprehensive jobs board with AWS RDS

---

### Phase 01: Jobs Page with RDS Integration

**Requirements:** JOBS-01, JOBS-02, JOBS-03, JOBS-04, JOBS-05, JOBS-06, JOBS-07, JOBS-08

**Goal:** Create a jobs listing page that fetches job postings from Amazon RDS database, displays them as filterable/searchable cards with pagination, and provides detailed job views with Google ads integration and apply button.

**Plans: 5 plans**
- [x] 01-01-PLAN.md — Research: Cloudflare Workers + Hyperdrive architecture, RDS schema requirements, incremental sync strategy
- [x] 01-02-PLAN.md — Implement: Cloudflare Worker API with RDS connection and KV caching layer
- [x] 01-03-PLAN.md — Implement: Vue.js jobs listing page with filters, pagination, and local storage
- [x] 01-04-PLAN.md — Implement: Job detail page with Google ads and apply button
- [x] 01-05-PLAN.md — Routing and navigation integration

---

### Phase 02: [Reserved for future]

---

## Requirements Registry

### Jobs Page Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| JOBS-01 | Connect to AWS RDS PostgreSQL via Cloudflare Worker | Critical | Planned |
| JOBS-02 | Implement local caching (KV) with 1-hour refresh | Critical | Planned |
| JOBS-03 | Manual trigger endpoint to refresh cached data | High | Planned |
| JOBS-04 | Display jobs as cards with pagination | High | Planned |
| JOBS-05 | Filter by location | High | Planned |
| JOBS-06 | Sort by posted date | High | Planned |
| JOBS-07 | Search by company name | Medium | Planned |
| JOBS-08 | Filter by years of experience | Medium | Planned |
| JOBS-09 | Job detail page with description | High | Planned |
| JOBS-10 | Google ads integration in detail page | Medium | Planned |
| JOBS-11 | Apply button opens in new tab | High | Planned |

---

## DB Credentials (stored securely)

```
Host: zentor-postgres.cz0sckkocuoa.ap-south-1.rds.amazonaws.com
Port: 5432
Database: postgres
Username: muneesh
Password: [Stored in Cloudflare Secrets]
SSL: Required (global-bundle.pem)
```