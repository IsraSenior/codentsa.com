#!/usr/bin/env bash
# =============================================================================
# Notification Script for Backup Container
# =============================================================================

set -euo pipefail

NOTIFICATION_TYPE="${NOTIFICATION_TYPE:-resend}"
RESEND_API_KEY="${RESEND_API_KEY:-}"
NOTIFICATION_EMAIL="${NOTIFICATION_EMAIL:-}"

send_notification() {
    local status="$1"
    local message="$2"

    if [ -z "$RESEND_API_KEY" ] || [ -z "$NOTIFICATION_EMAIL" ]; then
        return 0
    fi

    local emoji
    case "$status" in
        success) emoji="✅" ;;
        error) emoji="❌" ;;
        warning) emoji="⚠️" ;;
        info) emoji="ℹ️" ;;
        *) emoji="📢" ;;
    esac

    curl -s -X POST https://api.resend.com/emails \
        -H "Authorization: Bearer $RESEND_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"from\": \"Codentsa Backup <noreply@codentsa.es>\",
            \"to\": [\"$NOTIFICATION_EMAIL\"],
            \"subject\": \"$emoji $status - Backup System\",
            \"html\": \"<h2>$message</h2><p>Time: $(date -u +'%Y-%m-%d %H:%M:%S UTC')</p><p>Server: $(hostname)</p>\"
        }" > /dev/null 2>&1 || true
}

send_notification "$@"
