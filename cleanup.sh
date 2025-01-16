#!/bin/sh

docker compose --file docker-compose-test.yml down -v
docker compose --file docker-compose-test-firefox.yml down -v
docker compose --file docker-compose-test-chrome.yml down -v
rm -rf ./downloads
rm -rf ./docker/testData