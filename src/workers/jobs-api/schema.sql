-- Schema for job_postings table in RDS (PostgreSQL)
-- This file defines the table structure and includes dummy records for Zentor's job portal.

-- Enable UUID extension for unique job identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop table if it exists (Optional, use with caution in production)
-- DROP TABLE IF EXISTS job_postings;

-- Create job_postings table
CREATE TABLE IF NOT EXISTS job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_logo_url TEXT,
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) DEFAULT 'Full-time', -- e.g., 'Full-time', 'Internship', 'Contract'
    is_remote BOOLEAN DEFAULT false,
    experience_years INTEGER DEFAULT 0,
    salary_min NUMERIC(12, 2),
    salary_max NUMERIC(12, 2),
    salary_currency VARCHAR(10) DEFAULT 'INR',
    skills TEXT[], -- Array of required skills
    description TEXT NOT NULL,
    job_url TEXT NOT NULL,
    job_url_direct TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster filtering and searching
CREATE INDEX IF NOT EXISTS idx_job_postings_location ON job_postings(location);
CREATE INDEX IF NOT EXISTS idx_job_postings_company ON job_postings(company);
CREATE INDEX IF NOT EXISTS idx_job_postings_created_at ON job_postings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_postings_skills ON job_postings USING GIN(skills);

-- Trigger function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for update events
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_job_postings_updated_at') THEN
        CREATE TRIGGER update_job_postings_updated_at
            BEFORE UPDATE ON job_postings
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Insert Dummy Records for Zentor's Jobs Portal
INSERT INTO job_postings (
    title, company, location, job_type, is_remote, experience_years, 
    salary_min, salary_max, salary_currency, skills, description, job_url
) VALUES 
(
    'Fullstack Developer Intern', 
    'Zentor EdTech', 
    'Chennai, India', 
    'Internship', 
    true, 
    0, 
    15000, 25000, 'INR', 
    ARRAY['Vue.js', 'Node.js', 'PostgreSQL', 'Cloudflare Workers'], 
    'Join Zentor as a Fullstack Intern to build the future of education for Gen Z. You will work on our main platform, admissions portal, and recruiter dashboard.', 
    'https://zentor.in/internship/'
),
(
    'AI Research Associate', 
    'NeuralTech Solutions', 
    'Bangalore, India', 
    'Full-time', 
    false, 
    1, 
    800000, 1200000, 'INR', 
    ARRAY['Python', 'PyTorch', 'Large Language Models', 'FastAPI'], 
    'We are looking for an AI Research Associate to help us develop state-of-the-art NLP models for Indian languages.', 
    'https://neuraltech.example.com/careers/ai-research'
),
(
    'Frontend Engineer (React)', 
    'FinGo Systems', 
    'Mumbai, India', 
    'Full-time', 
    true, 
    2, 
    1200000, 1800000, 'INR', 
    ARRAY['React', 'TypeScript', 'TailwindCSS', 'Redux'], 
    'Build high-performance financial dashboards using modern React practices. Remote-first culture with occasional meetups in Mumbai.', 
    'https://fingo.example.com/jobs/frontend'
),
(
    'Data Analytics Intern', 
    'MarketLens India', 
    'Pune, India', 
    'Internship', 
    false, 
    0, 
    10000, 15000, 'INR', 
    ARRAY['SQL', 'Python', 'PowerBI', 'Excel'], 
    'Help our data team extract insights from market trends. Perfect for final year students looking for industry exposure.', 
    'https://marketlens.example.com/internship'
),
(
    'Backend Developer (Python)', 
    'SecureCloud Services', 
    'Hyderabad, India', 
    'Full-time', 
    false, 
    3, 
    1500000, 2200000, 'INR', 
    ARRAY['Python', 'Django', 'AWS', 'Docker'], 
    'Develop secure and scalable cloud infrastructure for our enterprise clients. Knowledge of AWS RDS and Terraform is a plus.', 
    'https://securecloud.example.com/careers/backend'
);