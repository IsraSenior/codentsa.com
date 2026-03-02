#!/usr/bin/env bash
# =============================================================================
# Daily Backup Script
# =============================================================================
# Backs up:
# - Directus PostgreSQL database
# - Umami PostgreSQL database
# - Directus uploads
# - Caddy configuration
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/backups"
DAILY_DIR="${BACKUP_DIR}/daily"
BACKUP_NAME="codentsa-${TIMESTAMP}"
BACKUP_PATH="${DAILY_DIR}/${BACKUP_NAME}"

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

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} [WARNING] $1"
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
# Backup Functions
# =============================================================================

backup_directus_db() {
    log_info "Backing up Directus database..."

    local dump_file="${BACKUP_PATH}/directus_db.sql.gz"

    if PGPASSWORD="${DIRECTUS_DB_PASSWORD}" pg_dump \
        -h "${DIRECTUS_DB_HOST}" \
        -p "${DIRECTUS_DB_PORT}" \
        -U "${DIRECTUS_DB_USER}" \
        -d "${DIRECTUS_DB_NAME}" \
        --no-owner \
        --no-acl \
        --clean \
        --if-exists \
        | gzip > "$dump_file"; then

        local size=$(du -h "$dump_file" | cut -f1)
        log_success "Directus database backed up successfully ($size)"
        return 0
    else
        log_error "Failed to backup Directus database"
        return 1
    fi
}

backup_umami_db() {
    log_info "Backing up Umami database..."

    local dump_file="${BACKUP_PATH}/umami_db.sql.gz"

    if PGPASSWORD="${UMAMI_DB_PASSWORD}" pg_dump \
        -h "${UMAMI_DB_HOST}" \
        -p "${UMAMI_DB_PORT}" \
        -U "${UMAMI_DB_USER}" \
        -d "${UMAMI_DB_NAME}" \
        --no-owner \
        --no-acl \
        --clean \
        --if-exists \
        | gzip > "$dump_file"; then

        local size=$(du -h "$dump_file" | cut -f1)
        log_success "Umami database backed up successfully ($size)"
        return 0
    else
        log_error "Failed to backup Umami database"
        return 1
    fi
}

backup_directus_uploads() {
    log_info "Backing up Directus uploads..."

    local uploads_dir="/data/directus_uploads"
    local tar_file="${BACKUP_PATH}/directus_uploads.tar.gz"

    if [ -d "$uploads_dir" ] && [ "$(ls -A "$uploads_dir" 2>/dev/null)" ]; then
        if tar -czf "$tar_file" -C "$uploads_dir" .; then
            local size=$(du -h "$tar_file" | cut -f1)
            log_success "Directus uploads backed up successfully ($size)"
            return 0
        else
            log_error "Failed to backup Directus uploads"
            return 1
        fi
    else
        log_warning "No uploads directory found or it's empty, skipping"
        touch "${BACKUP_PATH}/directus_uploads.empty"
        return 0
    fi
}

backup_caddy_config() {
    log_info "Backing up Caddy configuration..."

    local config_file="/data/caddy_config/Caddyfile"
    local backup_file="${BACKUP_PATH}/Caddyfile"

    if [ -f "$config_file" ]; then
        if cp "$config_file" "$backup_file"; then
            log_success "Caddy configuration backed up successfully"
            return 0
        else
            log_error "Failed to backup Caddy configuration"
            return 1
        fi
    else
        log_warning "Caddy configuration file not found, skipping"
        return 0
    fi
}

create_backup_metadata() {
    log_info "Creating backup metadata..."

    cat > "${BACKUP_PATH}/metadata.txt" << EOF
Backup Information
==================
Timestamp: ${TIMESTAMP}
Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Hostname: $(hostname)
Type: daily

Contents:
- Directus Database (PostgreSQL)
- Umami Database (PostgreSQL)
- Directus Uploads
- Caddy Configuration

Retention: ${BACKUP_RETENTION_DAYS:-7} days
EOF

    log_success "Backup metadata created"
}

# =============================================================================
# Main Backup Process
# =============================================================================

main() {
    log_info "========================================"
    log_info "Starting daily backup: ${BACKUP_NAME}"
    log_info "========================================"

    # Create backup directory
    mkdir -p "$BACKUP_PATH"

    # Track failures
    local failed=0

    # Backup Directus database
    backup_directus_db || failed=$((failed + 1))

    # Backup Umami database
    backup_umami_db || failed=$((failed + 1))

    # Backup Directus uploads
    backup_directus_uploads || failed=$((failed + 1))

    # Backup Caddy config
    backup_caddy_config || true # Non-critical

    # Create metadata
    create_backup_metadata

    # Calculate total backup size
    local total_size=$(du -sh "$BACKUP_PATH" | cut -f1)

    # Summary
    log_info "========================================"
    if [ $failed -eq 0 ]; then
        log_success "Backup completed successfully!"
        log_info "Location: $BACKUP_PATH"
        log_info "Total size: $total_size"
        log_info "========================================"

        send_notification "success" "Daily backup completed successfully ($total_size)"
        exit 0
    else
        log_error "Backup completed with $failed error(s)"
        log_info "Location: $BACKUP_PATH"
        log_info "Total size: $total_size"
        log_info "========================================"

        send_notification "warning" "Daily backup completed with $failed error(s)"
        exit 1
    fi
}

# =============================================================================
# Error Handler
# =============================================================================

error_handler() {
    log_error "Backup failed at line $1"
    send_notification "error" "Daily backup failed at line $1"
    exit 1
}

trap 'error_handler $LINENO' ERR

# =============================================================================
# Execute
# =============================================================================

main "$@"
