#!/usr/bin/env bash
# =============================================================================
# Backup Cleanup Script
# =============================================================================
# Removes daily backups older than BACKUP_RETENTION_DAYS (default: 7)
# Manual backups are NOT deleted automatically
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
BACKUP_DIR="/backups"
DAILY_DIR="${BACKUP_DIR}/daily"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"

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

format_size() {
    local size=$1
    if [ "$size" -lt 1024 ]; then
        echo "${size}B"
    elif [ "$size" -lt 1048576 ]; then
        echo "$((size / 1024))KB"
    elif [ "$size" -lt 1073741824 ]; then
        echo "$((size / 1048576))MB"
    else
        echo "$((size / 1073741824))GB"
    fi
}

# =============================================================================
# Main Cleanup Process
# =============================================================================

main() {
    log_info "========================================"
    log_info "Starting backup cleanup"
    log_info "Retention: ${RETENTION_DAYS} days"
    log_info "========================================"

    # Check if daily backup directory exists
    if [ ! -d "$DAILY_DIR" ]; then
        log_warning "Daily backup directory does not exist: $DAILY_DIR"
        exit 0
    fi

    # Find backups older than retention period
    log_info "Searching for backups older than ${RETENTION_DAYS} days..."

    local deleted_count=0
    local deleted_size=0
    local failed_count=0

    # Find and delete old backups
    while IFS= read -r -d '' backup_path; do
        local backup_name=$(basename "$backup_path")
        local backup_size=$(du -sb "$backup_path" | cut -f1)

        log_info "Deleting old backup: $backup_name ($(format_size $backup_size))"

        if rm -rf "$backup_path"; then
            deleted_count=$((deleted_count + 1))
            deleted_size=$((deleted_size + backup_size))
            log_success "Deleted: $backup_name"
        else
            log_error "Failed to delete: $backup_name"
            failed_count=$((failed_count + 1))
        fi
    done < <(find "$DAILY_DIR" -maxdepth 1 -mindepth 1 -type d -mtime +${RETENTION_DAYS} -print0)

    # Summary
    log_info "========================================"
    if [ $deleted_count -eq 0 ]; then
        log_info "No old backups found to delete"
    else
        log_success "Deleted $deleted_count backup(s)"
        log_info "Freed space: $(format_size $deleted_size)"

        if [ $failed_count -gt 0 ]; then
            log_warning "Failed to delete $failed_count backup(s)"
        fi
    fi

    # Show current backup usage
    if [ -d "$BACKUP_DIR" ]; then
        local total_size=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1 || echo "unknown")
        local daily_count=$(find "$DAILY_DIR" -maxdepth 1 -mindepth 1 -type d 2>/dev/null | wc -l || echo "0")
        local manual_count=0

        if [ -d "${BACKUP_DIR}/manual" ]; then
            manual_count=$(find "${BACKUP_DIR}/manual" -maxdepth 1 -mindepth 1 -type d 2>/dev/null | wc -l || echo "0")
        fi

        log_info "Current backup status:"
        log_info "  Daily backups: $daily_count"
        log_info "  Manual backups: $manual_count"
        log_info "  Total size: $total_size"
    fi

    log_info "========================================"

    # Send notification if backups were deleted
    if [ $deleted_count -gt 0 ]; then
        send_notification "info" "Cleanup: Deleted $deleted_count old backup(s), freed $(format_size $deleted_size)"
    fi

    exit 0
}

# =============================================================================
# Execute
# =============================================================================

main "$@"
