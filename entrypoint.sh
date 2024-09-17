__='
   R Depot
   
   Copyright (C) 2012-2024 Open Analytics NV
   
   ===========================================================================
   
   This program is free software: you can redistribute it and/or modify
   it under the terms of the Apache License as published by
   The Apache Software Foundation, either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
   Apache License for more details.
   
   You should have received a copy of the Apache License
   along with this program. If not, see <http://www.apache.org/licenses/>
   
'

#!/bin/sh
JSON_STRING='window.configs = { \
  "VITE_LOGIN_OIDC":"'"${VITE_LOGIN_OIDC}"'", \
  "VITE_LOGIN_SIMPLE":"'"${VITE_LOGIN_SIMPLE}"'", \
  "VITE_OIDC_AUTHORITY":"'"${VITE_OIDC_AUTHORITY}"'", \
  "VITE_OIDC_CLIENT_ID":"'"${VITE_OIDC_CLIENT_ID}"'", \
  "VITE_OIDC_REDIRECT_URI":"'"${VITE_OIDC_REDIRECT_URI}"'", \
  "VITE_OIDC_POST_LOGOUT_REDIRECT_URI":"'"${VITE_OIDC_POST_LOGOUT_REDIRECT_URI}"'", \
  "VITE_OIDC_RESPONSE_TYPE":"'"${VITE_OIDC_RESPONSE_TYPE}"'", \
  "VITE_OIDC_SCOPE":"'"${VITE_OIDC_SCOPE}"'", \
  "VITE_DEV_MODE":"'"${VITE_DEV_MODE}"'", \
  "VITE_URL_PREFIX":"'"${VITE_URL_PREFIX}"'", \
  "VITE_SERVER_ADDRESS":"'"${VITE_SERVER_ADDRESS}"'", \
  "VITE_CURRENT_COMMIT_VERSION":"'"${VITE_CURRENT_COMMIT_VERSION}"'" \
}'
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /usr/share/nginx/html/index.html
exec "$@"
