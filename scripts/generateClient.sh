openapiSpec=`cat scripts/api.json`

rm -r src/openapi/
mkdir src/openapi/
java -jar swagger-codegen/swagger-codegen-cli-3.0.68.jar generate    -i scripts/api.json -l typescript-axios -o src/openapi/

rm -r src/openapi/README.md src/openapi/package.json src/openapi/tsconfig.json src/openapi/git_push.sh src/openapi/.swagger-codegen-ignore src/openapi/.npmignore src/openapi/.gitignore src/openapi/.swagger-codegen/ scripts/api.json

