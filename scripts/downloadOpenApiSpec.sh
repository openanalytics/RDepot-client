mkdir -p swagger-codegen
if [ ! -f swagger-codegen/swagger-codegen-cli-3.0.68.jar ]; then
    curl --output swagger-codegen/swagger-codegen-cli-3.0.68.jar https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.68/swagger-codegen-cli-3.0.68.jar
fi

wget http://localhost:8017/v2/api-docs/ --output-document=scripts/api.json