#!/bin/sh

# Load configuration from YAML file if it exists.
# Environment variables take precedence over YAML values
# YAML values are only applied when the env var is unset or empty.
CONFIG_FILE="${CONFIG_FILE:-/opt/rdepot/config.yaml}"
if [ -f "$CONFIG_FILE" ]; then
  while IFS= read -r line; do
    case "$line" in
      ''|\#*) continue ;;
    esac
    key=$(echo "$line" | sed -n 's/^\([A-Za-z_][A-Za-z0-9_]*\):.*/\1/p')
    value=$(echo "$line" | sed -n 's/^[A-Za-z_][A-Za-z0-9_]*:[[:space:]]*//p')
    if [ -n "$key" ]; then
      eval current_val=\${$key}
      if [ -z "$current_val" ]; then
        export "$key=$value"
      fi
    fi
  done < "$CONFIG_FILE"
fi

VITE_URL_PREFIX="${VITE_URL_PREFIX:-/}"
JSON_STRING='window.configs = { \
  "VITE_LOGIN_OIDC":"'"${VITE_LOGIN_OIDC}"'", \
  "VITE_LOGIN_SIMPLE":"'"${VITE_LOGIN_SIMPLE}"'", \
  "VITE_OIDC_AUTHORITY":"'"${VITE_OIDC_AUTHORITY}"'", \
  "VITE_OIDC_CLIENT_ID":"'"${VITE_OIDC_CLIENT_ID}"'", \
  "VITE_OIDC_REDIRECT_URI":"'"${VITE_OIDC_REDIRECT_URI}"'", \
  "VITE_OIDC_POST_LOGOUT_REDIRECT_URI":"'"${VITE_OIDC_POST_LOGOUT_REDIRECT_URI}"'", \
  "VITE_OIDC_RESPONSE_TYPE":"'"${VITE_OIDC_RESPONSE_TYPE}"'", \
  "VITE_OIDC_SCOPE":"'"${VITE_OIDC_SCOPE}"'", \
  "VITE_REPO_SERVER_ADDRESS":"'"${VITE_REPO_SERVER_ADDRESS}"'", \
  "VITE_ADDRESS_DEPRECATION_WARNING":"'"${VITE_ADDRESS_DEPRECATION_WARNING}"'", \
  "VITE_DEV_MODE":"'"${VITE_DEV_MODE}"'", \
  "VITE_URL_PREFIX":"'"${VITE_URL_PREFIX}"'", \
  "VITE_SERVER_ADDRESS":"'"${VITE_SERVER_ADDRESS}"'", \
  "VITE_CURRENT_COMMIT_VERSION":"'"${VITE_CURRENT_COMMIT_VERSION}"'", \
  "VITE_ALLOWED_PACKAGE_DESCRIPTION_TAGS":"'"${VITE_ALLOWED_PACKAGE_DESCRIPTION_TAGS}"'", \
  "VITE_NAVBAR_TITLE":"'"${VITE_NAVBAR_TITLE}"'", \
  "VITE_BACKGROUND_COLOUR_DARK":"'"${VITE_BACKGROUND_COLOUR_DARK}"'", \
  "VITE_BACKGROUND_COLOUR_LIGHT":"'"${VITE_BACKGROUND_COLOUR_LIGHT}"'", \
  "VITE_PRIMARY_COLOUR_DARK":"'"${VITE_PRIMARY_COLOUR_DARK}"'", \
  "VITE_PRIMARY_COLOUR_LIGHT":"'"${VITE_PRIMARY_COLOUR_LIGHT}"'", \
  "VITE_SECONDARY_COLOUR_DARK":"'"${VITE_SECONDARY_COLOUR_DARK}"'", \
  "VITE_SECONDARY_COLOUR_LIGHT":"'"${VITE_SECONDARY_COLOUR_LIGHT}"'", \
  "VITE_ACCENT_COLOUR_DARK":"'"${VITE_ACCENT_COLOUR_DARK}"'", \
  "VITE_ACCENT_COLOUR_LIGHT":"'"${VITE_ACCENT_COLOUR_LIGHT}"'", \
  "VITE_NAVBAR_HEIGHT":"'"${VITE_NAVBAR_HEIGHT}"'", \
  "VITE_LOGO_SMALL_URL":"'"${VITE_LOGO_SMALL_URL}"'", \
  "VITE_LOGO_SMALL_HEIGHT":"'"${VITE_LOGO_SMALL_HEIGHT}"'", \
  "VITE_LOGO_SMALL_WIDTH":"'"${VITE_LOGO_SMALL_WIDTH}"'", \
  "VITE_LOGO_SMALL_CLASSES":"'"${VITE_LOGO_SMALL_CLASSES}"'", \
  "VITE_LOGO_SMALL_STYLE":"'"${VITE_LOGO_SMALL_STYLE}"'", \
  "VITE_LOGO_BIG_URL":"'"${VITE_LOGO_BIG_URL}"'", \
  "VITE_LOGO_BIG_HEIGHT":"'"${VITE_LOGO_BIG_HEIGHT}"'", \
  "VITE_LOGO_BIG_WIDTH":"'"${VITE_LOGO_BIG_WIDTH}"'", \
  "VITE_LOGO_BIG_CLASSES":"'"${VITE_LOGO_BIG_CLASSES}"'", \
  "VITE_LOGO_BIG_STYLE":"'"${VITE_LOGO_BIG_STYLE}"'", \
  "VITE_FAVICON_ICO_URL":"'"${VITE_FAVICON_ICO_URL}"'", \
  "VITE_FAVICON_SVG_URL":"'"${VITE_FAVICON_SVG_URL}"'", \
  "VITE_BORDER_RADIUS":"'"${VITE_BORDER_RADIUS}"'", \
  "VITE_FONT_FAMILY":"'"${VITE_FONT_FAMILY}"'", \
  "VITE_FONT_URL":"'"${VITE_FONT_URL}"'" \
}'
FAVICON_ICO_URL="${VITE_FAVICON_ICO_URL:-${VITE_URL_PREFIX}favicon.ico}"
FAVICON_SVG_URL="${VITE_FAVICON_SVG_URL:-${VITE_URL_PREFIX}images/RDepotLogo.svg}"
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@;s@src=\"/assets/@src=\"${VITE_URL_PREFIX}assets/@;s@href=\"/assets/@href=\"${VITE_URL_PREFIX}assets/@;s@href=\"/favicon.ico\"@href=\"${FAVICON_ICO_URL}\"@;s@href=\"/images/RDepotLogo.svg\"@href=\"${FAVICON_SVG_URL}\"@" /usr/share/nginx/html/index.html
for index in /usr/share/nginx/html/assets/index-*.js;
do
    sed -i "s@\"assets/@\".${VITE_URL_PREFIX}assets/@g" $index
done
for index in /usr/share/nginx/html/assets/index-*.css;
do
    sed -i "s@url(/assets/@url(${VITE_URL_PREFIX}assets/@g" $index
done
exec "$@"
