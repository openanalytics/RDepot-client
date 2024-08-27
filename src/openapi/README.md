# OPEN API - generation manual

- there has to be current backend instance running
- copy API from http://localhost:8017/v2/api-docs
- paste and transform it to yaml here: https://editor.swagger.io/
- there are 3 problems to solve here (indention is really important)
  - Link definition
    ```
     Link:
      type: object
      properties:
        type:
          type: string
        rel:
          type: string
        modifiableProperties:
          type: array
          items:
            type: string
        href:
          type: string
    ```
  - Links definition:
    ```
     Links:
      type: array
      items:
        $ref: '#/components/schemas/Link'
    ```
  - IDto definition:
    ```
    IDto:
      type: object
      properties:
        name:
          type: string
        email:
          type: string
        login:
          type: string
        role:
          type: string
        expirationDate:
          type: string
        creationDate:
          type: string
        version:
          type: string
        technology:
          type: string
        repository:
          type: object
          properties:
            name:
              type: string
            technology:
              type: string
        user:
          type: object
          properties:
            email:
              type: string
            login:
              type: string
            name:
              type: string
        packageName:
          type: string
        state:
          type: string
        packageBag:
          type: object
          properties:
            name:
              type: string
            version:
              type: string
            repository:
              type: object
              properties:
                name:
                  type: string
    ```
- generate client -> typescrtipt-axios
- uzip generated code in rdepot-client/src/openapis, overwrite everything, remove git_push.sh, README.md, tsconfig.json, package.json files because we don't need them, as our openapi is not in the separated project
- replace this (in all files that it occurs):
  ```
  const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
  ```
  with this:
  ```
   const needsSerialization =
    typeof body !== 'string' ||
    Object.entries(
      localVarRequestOptions.headers!
    ).find(([key, value]) => {
      if (
        value === 'application/json' &&
        key == 'Content-Type'
      ) {
        return true
      }
      return false
    })
  ```
- replace in the base file:
  ```
  export const BASE_PATH = 'http://localhost:8017'.replace(
  /\/+$/,
  ''
  )
  ```
  with this:
  ```
  export const BASE_PATH = getEnv(
  'VITE_SERVER_ADDRESS'
  ).replace(/\/+$/, '')
  ```
  and add the needed import
  ```
  import getEnv from '@/utils/env'
  ```
- make sure the RDepot license is at the top of each file, otherwise the license checker will fail

And now it should work. Npm run build should succeed
