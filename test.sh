#! /bin/bash
docker-compose -f docker-compose-test.yml up -d
until [ "$(docker inspect -f {{.State.Health.Status}} oa-rdepot-backend)" == "healthy" ]; do
    sleep 1.0;
done;

echo "Backend is ready"