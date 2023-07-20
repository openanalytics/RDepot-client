/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEYCLOAK_REALM_URI: string
  readonly VITE_KEYCLOAK_CLIENT_ID: string
  readonly VITE_KEYCLOAK_REDIRECT_URI: string
  readonly VITE_KEYCLOAK_POST_LOGOUT_REDIRECT_URI: string
  readonly VITE_KEYCLOAK_REPOSNSE_TYPE: string
  readonly VITE_KEYCLOAK_SCOPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
