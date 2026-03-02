-- =============================================================================
-- PostgreSQL Initialization Script for Umami Analytics
-- =============================================================================
-- This script is executed once when the PostgreSQL container is first created
-- Optimized for analytics workload
-- =============================================================================

-- Performance settings optimized for analytics
ALTER SYSTEM SET shared_buffers = '128MB';
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET effective_cache_size = '512MB';
ALTER SYSTEM SET maintenance_work_mem = '32MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '8MB';
ALTER SYSTEM SET default_statistics_target = 100;
ALTER SYSTEM SET random_page_cost = 1.1;
ALTER SYSTEM SET effective_io_concurrency = 200;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Connection security
ALTER SYSTEM SET password_encryption = 'scram-sha-256';
ALTER SYSTEM SET ssl = 'off'; -- Disabled as we're in internal Docker network

-- Logging for monitoring
ALTER SYSTEM SET log_connections = 'on';
ALTER SYSTEM SET log_disconnections = 'on';
ALTER SYSTEM SET log_duration = 'off'; -- Disabled for analytics (too noisy)
ALTER SYSTEM SET log_min_duration_statement = '5000'; -- Only log very slow queries
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';

-- Autovacuum settings for high-write workload (analytics)
ALTER SYSTEM SET autovacuum_vacuum_scale_factor = 0.05;
ALTER SYSTEM SET autovacuum_analyze_scale_factor = 0.02;
ALTER SYSTEM SET autovacuum_vacuum_cost_limit = 400;

-- Reload configuration
SELECT pg_reload_conf();

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Umami PostgreSQL database initialized successfully';
    RAISE NOTICE 'Database: codentsa_umami';
    RAISE NOTICE 'Security: SCRAM-SHA-256 authentication enabled';
    RAISE NOTICE 'Optimized for: Analytics workload';
END $$;
