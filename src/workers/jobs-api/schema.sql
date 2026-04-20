-- Schema for job_postings table (already exists in RDS)
-- Reference only - do not create, table already exists

-- SELECT * FROM job_postings;

-- Example queries for filtering:
-- SELECT * FROM job_postings WHERE location ILIKE '%Bangalore%';
-- SELECT * FROM job_postings WHERE company ILIKE '%Google%';
-- SELECT * FROM job_postings WHERE experience_years BETWEEN 1 AND 3;
-- SELECT * FROM job_postings ORDER BY created_at DESC;

-- Incremental sync:
-- SELECT * FROM job_postings WHERE updated_at > '2026-04-20T00:00:00Z';