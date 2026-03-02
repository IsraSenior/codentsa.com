#!/usr/bin/env bash
# =============================================================================
# Complete System Restore Script
# =============================================================================
# Usage: ./restore.sh <backup-path>
# Example: ./restore.sh /backups/daily/codentsa-20250124-030000
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

confirm() {
    local prompt="$1"
    local response

    echo -e "${YELLOW}[CONFIRM]${NC} $prompt"
    read -p "Type 'yes' to continue: " response

    if [ "$response" != "yes" ]; then
        log_error "Restore cancelled by user"
        exit 1
    fi
}

# =============================================================================
# Validation
# =============================================================================

validate_backup() {
    local backup_path="$1"

    log_info "Validating backup at: $backup_path"

    # Check if backup directory exists
    if [ ! -d "$backup_path" ]; then
        log_error "Backup directory not found: $backup_path"
        return 1
    fi

    # Check for required files
    local required_files=(
        "directus_db.sql.gz"
        "umami_db.sql.gz"
        "metadata.txt"
    )

    for file in "${required_files[@]}"; do
        if [ ! -f "$backup_path/$file" ]; then
            log_warning "Required file not found: $file"
        fi
    done

    # Display backup metadata
    if [ -f "$backup_path/metadata.txt" ]; then
        log_info "Backup metadata:"
        cat "$backup_path/metadata.txt"
        echo ""
    fi

    log_success "Backup validation complete"
    return 0
}

# =============================================================================
# Restore Functions
# =============================================================================

restore_directus_db() {
    local backup_path="$1"
    local dump_file="$backup_path/directus_db.sql.gz"

    if [ ! -f "$dump_file" ]; then
        log_error "Directus database dump not found"
        return 1
    fi

    log_info "Restoring Directus database..."
    log_warning "This will DROP and recreate all Directus tables!"

    confirm "Are you sure you want to restore the Directus database?"

    # Restore database
    if gunzip -c "$dump_file" | docker exec -i codentsa_postgres_directus \
        psql -U "${DIRECTUS_DB_USER}" -d "${DIRECTUS_DB_NAME}"; then
        log_success "Directus database restored successfully"
        return 0
    else
        log_error "Failed to restore Directus database"
        return 1
    fi
}

restore_umami_db() {
    local backup_path="$1"
    local dump_file="$backup_path/umami_db.sql.gz"

    if [ ! -f "$dump_file" ]; then
        log_error "Umami database dump not found"
        return 1
    fi

    log_info "Restoring Umami database..."
    log_warning "This will DROP and recreate all Umami tables!"

    confirm "Are you sure you want to restore the Umami database?"

    # Restore database
    if gunzip -c "$dump_file" | docker exec -i codentsa_postgres_umami \
        psql -U "${UMAMI_DB_USER}" -d "${UMAMI_DB_NAME}"; then
        log_success "Umami database restored successfully"
        return 0
    else
        log_error "Failed to restore Umami database"
        return 1
    fi
}

restore_directus_uploads() {
    local backup_path="$1"
    local tar_file="$backup_path/directus_uploads.tar.gz"

    if [ ! -f "$tar_file" ]; then
        log_warning "Directus uploads backup not found, skipping"
        return 0
    fi

    log_info "Restoring Directus uploads..."

    confirm "Are you sure you want to restore Directus uploads?"

    # Create temporary directory for extraction
    local temp_dir=$(mktemp -d)

    # Extract backup
    if tar -xzf "$tar_file" -C "$temp_dir"; then
        # Copy to volume (requires docker cp)
        log_info "Copying uploads to volume..."

        # Get upload directory from volume
        local volume_name="codentsa_directus_uploads"
        local container_path="/directus/uploads"

        # Remove old uploads and copy new ones
        docker run --rm \
            -v "$volume_name:$container_path" \
            -v "$temp_dir:/backup" \
            alpine:3.19 \
            sh -c "rm -rf $container_path/* && cp -r /backup/* $container_path/"

        log_success "Directus uploads restored successfully"
        rm -rf "$temp_dir"
        return 0
    else
        log_error "Failed to restore Directus uploads"
        rm -rf "$temp_dir"
        return 1
    fi
}

restart_services() {
    log_info "Restarting services to apply changes..."

    cd "$(dirname "$0")/../.."

    if docker compose restart nuxt directus umami; then
        log_success "Services restarted successfully"

        # Wait for services to be healthy
        log_info "Waiting for services to become healthy..."
        sleep 30

        return 0
    else
        log_error "Failed to restart services"
        return 1
    fi
}

# =============================================================================
# Main Restore Process
# =============================================================================

main() {
    # Check arguments
    if [ $# -lt 1 ]; then
        log_error "Usage: $0 <backup-path>"
        log_info "Example: $0 /backups/daily/codentsa-20250124-030000"
        exit 1
    fi

    local backup_path="$1"

    log_info "========================================"
    log_info "Codentsa.es - System Restore"
    log_info "========================================"
    echo ""

    # Validate backup
    if ! validate_backup "$backup_path"; then
        log_error "Backup validation failed"
        exit 1
    fi

    echo ""
    log_warning "========================================"
    log_warning "⚠️  WARNING: This is a destructive operation!"
    log_warning "========================================"
    log_warning "This will:"
    log_warning "  - DROP and restore all database tables"
    log_warning "  - Replace all Directus uploads"
    log_warning "  - Restart all services"
    echo ""

    confirm "Are you ABSOLUTELY sure you want to proceed with the restore?"

    echo ""
    log_info "Starting restore process..."
    echo ""

    # Track failures
    local failed=0

    # Restore databases
    restore_directus_db "$backup_path" || failed=$((failed + 1))
    echo ""

    restore_umami_db "$backup_path" || failed=$((failed + 1))
    echo ""

    # Restore uploads
    restore_directus_uploads "$backup_path" || failed=$((failed + 1))
    echo ""

    # Restart services
    restart_services || failed=$((failed + 1))
    echo ""

    # Summary
    log_info "========================================"
    if [ $failed -eq 0 ]; then
        log_success "Restore completed successfully!"
        log_info "All services have been restarted"
        log_info "Please verify that everything is working correctly"
    else
        log_error "Restore completed with $failed error(s)"
        log_warning "Please check the logs and verify system status"
    fi
    log_info "========================================"

    exit $failed
}

# =============================================================================
# Error Handler
# =============================================================================

error_handler() {
    log_error "Restore failed at line $1"
    exit 1
}

trap 'error_handler $LINENO' ERR

# =============================================================================
# Execute
# =============================================================================

main "$@"
