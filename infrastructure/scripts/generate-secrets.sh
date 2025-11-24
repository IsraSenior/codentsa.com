#!/usr/bin/env bash
# =============================================================================
# Generate Secure Secrets for Codentsa.es
# =============================================================================
# This script generates cryptographically secure random secrets for:
# - Directus SECRET and KEY
# - Umami APP_SECRET
# - PostgreSQL passwords
# =============================================================================

set -euo pipefail

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# =============================================================================
# Helper Functions
# =============================================================================

generate_hex_secret() {
    local length=${1:-32}
    openssl rand -hex "$length"
}

generate_password() {
    local length=${1:-32}
    openssl rand -base64 "$length" | tr -d "=+/" | cut -c1-"$length"
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# =============================================================================
# Main
# =============================================================================

main() {
    echo "========================================"
    echo "Codentsa.es - Secret Generator"
    echo "========================================"
    echo ""

    log_info "Generating secure secrets..."
    echo ""

    # Directus secrets
    log_success "Directus Configuration:"
    echo "DIRECTUS_SECRET=$(generate_hex_secret 32)"
    echo "DIRECTUS_KEY=$(generate_hex_secret 32)"
    echo ""

    # Umami secret
    log_success "Umami Configuration:"
    echo "UMAMI_APP_SECRET=$(generate_hex_secret 32)"
    echo ""

    # Database passwords
    log_success "PostgreSQL Passwords:"
    echo "DIRECTUS_DB_PASSWORD=$(generate_password 32)"
    echo "UMAMI_DB_PASSWORD=$(generate_password 32)"
    echo ""

    # Admin password
    log_success "Admin Password (change after first login!):"
    echo "DIRECTUS_ADMIN_PASSWORD=$(generate_password 16)"
    echo ""

    echo "========================================"
    log_warning "IMPORTANT SECURITY NOTES:"
    echo "========================================"
    echo "1. Save these secrets in a secure password manager"
    echo "2. Add them to your .env file in infrastructure/"
    echo "3. Never commit the .env file to version control"
    echo "4. Change the admin password after first login"
    echo "5. These secrets should only be generated ONCE"
    echo ""
}

main "$@"
