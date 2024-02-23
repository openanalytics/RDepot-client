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