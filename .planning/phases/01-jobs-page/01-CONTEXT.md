# CONTEXT.md - Jobs Page with RDS Integration

## Phase: 01 - Jobs Page with RDS Integration

## User Requirements (from discussion)

### Core Functionality
1. **Database**: Jobs fetched from Amazon RDS PostgreSQL
   - Host: zentor-postgres.cz0sckkocuoa.ap-south-1.rds.amazonaws.com
   - Port: 5432, Database: postgres, Username: muneesh
   - Password: Zentoradmin19
   - SSL: Required (global-bundle.pem)

2. **Caching Strategy**: 
   - Once fetched from DB, store data locally (static - doesn't change)
   - Trigger URL to refresh data from DB
   - OR auto-refresh once every hour from DB
   - Only get UPDATED/new data, not full data each time (incremental sync)

3. **Job Listing Display**:
   - Jobs displayed as cards
   - Pagination support
   - Follow same base website theming (from AGENTS.md)

4. **Filtering & Search**:
   - Filter by location
   - Sort by posted date
   - Search by company
   - Filter by years of experience

5. **Job Detail Page**:
   - Opens in new window
   - Google ads displayed
   - Full job description
   - Apply button at bottom (opens in new tab)

### Technical Decisions (locked)
- Use Cloudflare Workers with Hyperdrive for RDS connection (NOT direct client-side to avoid exposing credentials)
- Cloudflare KV for local caching
- Incremental sync using last_updated timestamps
- Vue.js frontend with existing component patterns
- Follow Zentor design system from AGENTS.md

### Deferred Ideas
- None identified yet

### OpenCode's Discretion
- Database schema design (user hasn't created DB yet)
- Google Ad placement/ad format
- Pagination style (number vs "load more")
- Exact filter UI components