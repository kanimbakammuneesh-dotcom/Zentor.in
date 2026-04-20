export interface Job {
  id: string;
  title: string;
  company: string;
  company_logo_url: string | null;
  location: string;
  job_type: string;
  is_remote: boolean;
  experience_years: number;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  skills: string[] | null;
  description: string;
  job_url: string;
  job_url_direct: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface JobFilters {
  location: string;
  company: string;
  minExp: number | null;
  maxExp: number | null;
  sort: 'date' | 'experience';
  page: number;
  limit: number;
}