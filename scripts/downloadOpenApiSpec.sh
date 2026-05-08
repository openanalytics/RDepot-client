mkdir -p openapi-generator
if [ ! -f openapi-generator/openapi-generator-cli.jar ]; then
  curl -L \
    -o openapi-generator/openapi-generator-cli.jar \
    https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar
fi

wget http://localhost:8017/v2/api-docs/ --output-document=scripts/api.json