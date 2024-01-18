__='
   This is the default license template.
   
   File: entrypoint.sh
   Author: weronika
   Copyright (c) 2024 weronika
   
   To edit this license information: Press Ctrl+Shift+P and press 'Create new License Template...'.
'

#!/bin/sh
echo "ENTRYPOINT sie odpalil"
JSON_STRING='window.configs = { \
  "VITE_LOGIN_OIDC":"'"${VITE_LOGIN_OIDC}"'", \
  "VITE_LOGIN_SIMPLE":"'"${VITE_LOGIN_SIMPLE}"'", \
  "VITE_KEYCLOAK_REALM_URI":"'"${VITE_KEYCLOAK_REALM_URI}"'", \
  "VITE_KEYCLOAK_CLIENT_ID":"'"${VITE_KEYCLOAK_CLIENT_ID}"'", \
  "VITE_KEYCLOAK_REDIRECT_URI":"'"${VITE_KEYCLOAK_REDIRECT_URI}"'", \
  "VITE_KEYCLOAK_POST_LOGOUT_REDIRECT_URI":"'"${VITE_KEYCLOAK_POST_LOGOUT_REDIRECT_URI}"'", \
  "VITE_KEYCLOAK_REPOSNSE_TYPE":"'"${VITE_KEYCLOAK_REPOSNSE_TYPE}"'", \
  "VITE_KEYCLOAK_SCOPE":"'"${VITE_KEYCLOAK_SCOPE}"'" \
}'
echo ${JSON_STRING}
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html
cat /usr/share/nginx/html/index.html
exec "$@"