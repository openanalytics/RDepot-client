openapiSpec=`cat scripts/api.json`

rm -r src/openapi/
mkdir src/openapi/
java -jar openapi-generator/openapi-generator-cli.jar generate \
  -i scripts/api.json \
  -g typescript-axios \
  -o src/openapi \
  --additional-properties=\
apiPackage=apis,\
modelPackage=models,\
supportsES6=true,\
typescriptThreePlus=true,\
enumPropertyNaming=UPPERCASE

rm -r  src/openapi/git_push.sh src/openapi/.openapi-generator-ignore src/openapi/.npmignore src/openapi/.gitignore scripts/api.json

