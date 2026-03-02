#!/usr/bin/env bash
# =============================================================================
# Notification Script - Send alerts via Resend
# =============================================================================
# Usage: ./notify.sh <status> <message> [details]
# Status: success, error, warning, info
# =============================================================================

set -euo pipefail

# Configuration
NOTIFICATION_TYPE="${NOTIFICATION_TYPE:-resend}"
RESEND_API_KEY="${RESEND_API_KEY:-}"
NOTIFICATION_EMAIL="${NOTIFICATION_EMAIL:-}"
FROM_EMAIL="Codentsa System <noreply@codentsa.es>"

# =============================================================================
# Helper Functions
# =============================================================================

send_resend_email() {
    local status="$1"
    local message="$2"
    local details="${3:-}"

    # Validate configuration
    if [ -z "$RESEND_API_KEY" ] || [ -z "$NOTIFICATION_EMAIL" ]; then
        echo "ERROR: RESEND_API_KEY or NOTIFICATION_EMAIL not configured"
        return 1
    fi

    # Determine subject prefix and emoji based on status
    local subject_prefix
    local emoji

    case "$status" in
        success)
            subject_prefix="✅ Success"
            emoji="✅"
            ;;
        error)
            subject_prefix="❌ Error"
            emoji="❌"
            ;;
        warning)
            subject_prefix="⚠️ Warning"
            emoji="⚠️"
            ;;
        info)
            subject_prefix="ℹ️ Info"
            emoji="ℹ️"
            ;;
        *)
            subject_prefix="📢 Notification"
            emoji="📢"
            ;;
    esac

    # Build email body
    local html_body
    html_body="<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .status { font-size: 48px; margin-bottom: 10px; }
        .message { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
        .details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; font-family: monospace; white-space: pre-wrap; font-size: 14px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
        .timestamp { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class=\"header\">
        <div class=\"status\">$emoji</div>
        <div class=\"message\">$message</div>
        <div class=\"timestamp\">$(date -u +'%Y-%m-%d %H:%M:%S UTC')</div>
    </div>

    <p><strong>Server:</strong> $(hostname)</p>
    <p><strong>Status:</strong> $status</p>"

    if [ -n "$details" ]; then
        html_body+="
    <div class=\"details\">$details</div>"
    fi

    html_body+="
    <div class=\"footer\">
        <p>This is an automated notification from Codentsa.es monitoring system.</p>
        <p>Server: $(hostname) | Time: $(date -u +'%Y-%m-%d %H:%M:%S UTC')</p>
    </div>
</body>
</html>"

    # Send email via Resend API
    local response
    response=$(curl -s -w "\n%{http_code}" -X POST https://api.resend.com/emails \
        -H "Authorization: Bearer $RESEND_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"from\": \"$FROM_EMAIL\",
            \"to\": [\"$NOTIFICATION_EMAIL\"],
            \"subject\": \"$subject_prefix - codentsa.es\",
            \"html\": $(echo "$html_body" | jq -Rs .)
        }")

    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | head -n-1)

    if [ "$http_code" = "200" ]; then
        echo "Notification sent successfully via Resend"
        return 0
    else
        echo "Failed to send notification: HTTP $http_code"
        echo "Response: $body"
        return 1
    fi
}

send_console_notification() {
    local status="$1"
    local message="$2"
    local details="${3:-}"

    echo "========================================"
    echo "NOTIFICATION: $status"
    echo "========================================"
    echo "Message: $message"
    echo "Time: $(date -u +'%Y-%m-%d %H:%M:%S UTC')"

    if [ -n "$details" ]; then
        echo ""
        echo "Details:"
        echo "$details"
    fi

    echo "========================================"
}

# =============================================================================
# Main
# =============================================================================

main() {
    # Validate arguments
    if [ $# -lt 2 ]; then
        echo "Usage: $0 <status> <message> [details]"
        echo "Status: success, error, warning, info"
        exit 1
    fi

    local status="$1"
    local message="$2"
    local details="${3:-}"

    # Send notification based on type
    case "$NOTIFICATION_TYPE" in
        resend)
            send_resend_email "$status" "$message" "$details"
            ;;
        console)
            send_console_notification "$status" "$message" "$details"
            ;;
        *)
            echo "Unknown notification type: $NOTIFICATION_TYPE"
            send_console_notification "$status" "$message" "$details"
            ;;
    esac
}

# =============================================================================
# Execute
# =============================================================================

main "$@"
