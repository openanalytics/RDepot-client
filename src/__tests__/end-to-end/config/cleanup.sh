#!/bin/sh

docker compose --file src/__tests__/end-to-end/config/docker-compose-test-firefox.yml down -v
docker compose --file src/__tests__/end-to-end/config/docker-compose-test-chrome.yml down -v
rm -rf ./downloads
rm -rf ./docker/testData