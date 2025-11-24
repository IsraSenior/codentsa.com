#!/usr/bin/env bash
# =============================================================================
# Backup Service Entrypoint
# =============================================================================

set -euo pipefail

echo "========================================"
echo "Codentsa.es - Backup Service"
echo "========================================"
echo "Starting at: $(date)"
echo "Timezone: $TZ"
echo "Retention: ${BACKUP_RETENTION_DAYS:-7} days"
echo "========================================"
echo ""

# Validate required environment variables
REQUIRED_VARS=(
    "DIRECTUS_DB_HOST"
    "DIRECTUS_DB_PORT"
    "DIRECTUS_DB_NAME"
    "DIRECTUS_DB_USER"
    "DIRECTUS_DB_PASSWORD"
    "UMAMI_DB_HOST"
    "UMAMI_DB_PORT"
    "UMAMI_DB_NAME"
    "UMAMI_DB_USER"
    "UMAMI_DB_PASSWORD"
)

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var:-}" ]; then
        echo "ERROR: Required environment variable $var is not set"
        exit 1
    fi
done

# Create pgpass file for passwordless authentication
cat > /root/.pgpass << EOF
${DIRECTUS_DB_HOST}:${DIRECTUS_DB_PORT}:${DIRECTUS_DB_NAME}:${DIRECTUS_DB_USER}:${DIRECTUS_DB_PASSWORD}
${UMAMI_DB_HOST}:${UMAMI_DB_PORT}:${UMAMI_DB_NAME}:${UMAMI_DB_USER}:${UMAMI_DB_PASSWORD}
EOF
chmod 600 /root/.pgpass

echo "✓ Database credentials configured"

# Test database connections
echo ""
echo "Testing database connections..."

if pg_isready -h "$DIRECTUS_DB_HOST" -p "$DIRECTUS_DB_PORT" -U "$DIRECTUS_DB_USER" -d "$DIRECTUS_DB_NAME" > /dev/null 2>&1; then
    echo "✓ Directus database is reachable"
else
    echo "⚠ Directus database is not reachable (will retry during backup)"
fi

if pg_isready -h "$UMAMI_DB_HOST" -p "$UMAMI_DB_PORT" -U "$UMAMI_DB_USER" -d "$UMAMI_DB_NAME" > /dev/null 2>&1; then
    echo "✓ Umami database is reachable"
else
    echo "⚠ Umami database is not reachable (will retry during backup)"
fi

# Create initial health marker
touch /tmp/backup-healthy

echo ""
echo "✓ Backup service initialized successfully"
echo "✓ Cron jobs scheduled:"
echo "  - Daily backup: 3:00 AM"
echo "  - Daily cleanup: 6:00 AM"
echo ""

# Execute the command (crond)
exec "$@"
