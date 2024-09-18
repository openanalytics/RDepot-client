#!/bin/sh
mkdir ./docker/testData ./docker/testData/itestGenerated ./docker/testData/itestNewFiles ./docker/testData/itestSourceFiles ./docker/testData/itestTrashFiles
mkdir -m 777 ./downloads
docker-compose -f docker-compose-test.yml up -d
while [ "$(docker inspect -f {{.State.Health.Status}} oa-rdepot-backend)" != "healthy" ]; do
    sleep 1.0;
done;
echo "Backend is ready"