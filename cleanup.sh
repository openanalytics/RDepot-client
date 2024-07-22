#!/bin/sh

docker-compose -f docker-compose-test.yml down
rm -rf ./downloads
rm -rf ./docker/testData