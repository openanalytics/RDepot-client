#!/bin/sh
mkdir docker/testData docker/testData/itestGenerated docker/testData/itestNewFiles docker/testData/itestSourceFiles docker/testData/itestTrashFiles
mkdir -m 777 downloads
docker --config=/.docker compose \
  --env-file src/__tests__/config/.env.test \
  --file src/__tests__/end-to-end/config/docker-compose-test-chrome.yml \
  --file src/__tests__/end-to-end/config/docker-compose-test-firefox.yml up -d
while [ "$(docker inspect -f {{.State.Health.Status}} oa-rdepot-backend-chrome)" != "healthy" -a "$(docker inspect -f {{.State.Health.Status}} oa-rdepot-backend-firefox)" != "healthy" ]; do
    sleep 1.0;
done;
echo "Backend is ready"