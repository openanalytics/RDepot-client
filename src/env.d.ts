/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_OIDC: string
  readonly VITE_LOGIN_SIMPLE: string
  readonly VITE_OIDC_AUTHORITY: string
  readonly VITE_OIDC_CLIENT_ID: string
  readonly VITE_OIDC_REDIRECT_URI: string
  readonly VITE_OIDC_POST_LOGOUT_REDIRECT_URI: string
  readonly VITE_OIDC_RESPONSE_TYPE: string
  readonly VITE_OIDC_SCOPE: string
  readonly VITE_DEV_MODE: string
  readonly VITE_URL_PREFIX: string
  readonly VITE_SERVER_ADDRESS: string
  readonly VITE_CURRENT_COMMIT_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
