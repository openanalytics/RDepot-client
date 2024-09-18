#!/bin/sh

docker-compose -f docker-compose-test.yml down -v
rm -rf ./downloads
rm -rf ./docker/testData