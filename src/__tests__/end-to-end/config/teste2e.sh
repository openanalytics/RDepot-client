#!/usr/bin/env bash
DOCKER_CONFIG_FLAG=""
if [ "$1" = "--ci" ]; then
  DOCKER_CONFIG_FLAG="--config=/.docker"
fi

[ -d "docker/testData" ] && rm -rf "docker/testData"
[ -d "downloads" ] && rm -rf "downloads"

mkdir docker/testData docker/testData/itestGenerated docker/testData/itestNewFiles docker/testData/itestSourceFiles docker/testData/itestTrashFiles docker/testData/itestServer
mkdir -m 777 downloads
cp -rf src/__tests__/end-to-end/testData docker/
cd docker/testData && tar -xzf itestSource.tar.gz
cd ../..

docker $DOCKER_CONFIG_FLAG compose \
  --env-file src/__tests__/config/.env.test \
  --file src/__tests__/end-to-end/config/docker-compose-test-chrome.yml \
  --file src/__tests__/end-to-end/config/docker-compose-test-firefox.yml up -d
while [ "$(docker inspect -f \{\{.State.Health.Status\}\} oa-rdepot-backend-chrome)" != "healthy" ] && [ "$(docker inspect -f \{\{.State.Health.Status\}\} oa-rdepot-backend-firefox)" != "healthy" ]; do
    sleep 1.0;
done;
echo "Backend is ready"
