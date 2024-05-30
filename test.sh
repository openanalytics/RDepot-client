#!/bin/sh
docker-compose -f docker-compose-test.yml up -d
while [ "$(docker inspect -f {{.State.Health.Status}} oa-rdepot-backend)" != "healthy" ]; do
    sleep 1.0;
done;
apt-get install chromium-driver
apt-get install default-jre
apt-get -f install
apt-get install chromium-browser
apt update -y
echo "Backend is ready"