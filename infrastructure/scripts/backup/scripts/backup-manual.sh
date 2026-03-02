#!/usr/bin/env bash
# =============================================================================
# Manual Backup Script
# =============================================================================
# Usage: ./backup-manual.sh [label]
# Example: ./backup-manual.sh pre-deploy-v2.0
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
LABEL="${1:-manual}"
BACKUP_DIR="/backups"
MANUAL_DIR="${BACKUP_DIR}/manual"
BACKUP_NAME="codentsa-${LABEL}-${TIMESTAMP}"
BACKUP_PATH="${MANUAL_DIR}/${BACKUP_NAME}"

# Notification script
NOTIFY_SCRIPT="/scripts/notify.sh"

# =============================================================================
# Helper Functions
# =============================================================================

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} [INFO] $1"
}

log_success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} [SUCCESS] $1"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} [ERROR] $1"
}

send_notification() {
    local status=$1
    local message=$2

    if [ -x "$NOTIFY_SCRIPT" ]; then
        "$NOTIFY_SCRIPT" "$status" "$message" || true
    fi
}

# =============================================================================
# Main Backup Process
# =============================================================================

main() {
    log_info "========================================"
    log_info "Starting manual backup: ${BACKUP_NAME}"
    log_info "========================================"

    # Create backup directory
    mkdir -p "$BACKUP_PATH"

    # Track failures
    local failed=0

    # Backup Directus database
    log_info "Backing up Directus database..."
    if PGPASSWORD="${DIRECTUS_DB_PASSWORD}" pg_dump \
        -h "${DIRECTUS_DB_HOST}" \
        -p "${DIRECTUS_DB_PORT}" \
        -U "${DIRECTUS_DB_USER}" \
        -d "${DIRECTUS_DB_NAME}" \
        --no-owner \
        --no-acl \
        --clean \
        --if-exists \
        | gzip > "${BACKUP_PATH}/directus_db.sql.gz"; then
        log_success "Directus database backed up"
    else
        log_error "Failed to backup Directus database"
        failed=$((failed + 1))
    fi

    # Backup Umami database
    log_info "Backing up Umami database..."
    if PGPASSWORD="${UMAMI_DB_PASSWORD}" pg_dump \
        -h "${UMAMI_DB_HOST}" \
        -p "${UMAMI_DB_PORT}" \
        -U "${UMAMI_DB_USER}" \
        -d "${UMAMI_DB_NAME}" \
        --no-owner \
        --no-acl \
        --clean \
        --if-exists \
        | gzip > "${BACKUP_PATH}/umami_db.sql.gz"; then
        log_success "Umami database backed up"
    else
        log_error "Failed to backup Umami database"
        failed=$((failed + 1))
    fi

    # Backup Directus uploads
    log_info "Backing up Directus uploads..."
    if [ -d "/data/directus_uploads" ]; then
        if tar -czf "${BACKUP_PATH}/directus_uploads.tar.gz" -C /data/directus_uploads .; then
            log_success "Directus uploads backed up"
        else
            log_error "Failed to backup Directus uploads"
            failed=$((failed + 1))
        fi
    else
        log_info "No uploads directory found, skipping"
    fi

    # Backup Caddy config
    if [ -f "/data/caddy_config/Caddyfile" ]; then
        cp /data/caddy_config/Caddyfile "${BACKUP_PATH}/Caddyfile" || true
    fi

    # Create metadata
    cat > "${BACKUP_PATH}/metadata.txt" << EOF
Backup Information
==================
Timestamp: ${TIMESTAMP}
Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Label: ${LABEL}
Type: manual

Contents:
- Directus Database (PostgreSQL)
- Umami Database (PostgreSQL)
- Directus Uploads
- Caddy Configuration

Note: Manual backups are not automatically cleaned up
EOF

    # Calculate total backup size
    local total_size=$(du -sh "$BACKUP_PATH" | cut -f1)

    # Summary
    log_info "========================================"
    if [ $failed -eq 0 ]; then
        log_success "Manual backup completed successfully!"
        log_info "Location: $BACKUP_PATH"
        log_info "Total size: $total_size"
        log_info "========================================"

        send_notification "success" "Manual backup '${LABEL}' completed ($total_size)"
        exit 0
    else
        log_error "Backup completed with $failed error(s)"
        log_info "Location: $BACKUP_PATH"
        log_info "========================================"

        send_notification "warning" "Manual backup '${LABEL}' completed with $failed error(s)"
        exit 1
    fi
}

# =============================================================================
# Execute
# =============================================================================

main "$@"
