-- =============================================================================
-- PostgreSQL Initialization Script for Directus
-- =============================================================================
-- This script is executed once when the PostgreSQL container is first created
-- Security hardening included
-- =============================================================================

-- Performance and security settings
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;
ALTER SYSTEM SET work_mem = '1310kB';
ALTER SYSTEM SET min_wal_size = '1GB';
ALTER SYSTEM SET max_wal_size = '4GB';

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- For accent-insensitive search

-- Connection security
ALTER SYSTEM SET password_encryption = 'scram-sha-256';
ALTER SYSTEM SET ssl = 'off'; -- Disabled as we're in internal Docker network

-- Logging for monitoring
ALTER SYSTEM SET log_connections = 'on';
ALTER SYSTEM SET log_disconnections = 'on';
ALTER SYSTEM SET log_duration = 'on';
ALTER SYSTEM SET log_min_duration_statement = '1000'; -- Log queries > 1s
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';

-- Security: Restrict dangerous functions
-- REVOKE EXECUTE ON FUNCTION pg_read_file(text) FROM PUBLIC;
-- REVOKE EXECUTE ON FUNCTION pg_ls_dir(text) FROM PUBLIC;

-- Create indexes for common Directus queries (will be created by Directus migrations)
-- These are just examples, Directus will handle its own schema

-- Reload configuration
SELECT pg_reload_conf();

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Directus PostgreSQL database initialized successfully';
    RAISE NOTICE 'Database: codentsa_directus';
    RAISE NOTICE 'Security: SCRAM-SHA-256 authentication enabled';
    RAISE NOTICE 'Extensions: uuid-ossp, pg_trgm, unaccent';
END $$;
