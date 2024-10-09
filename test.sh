__='
   R Depot
   
   Copyright (C) 2012-2024 Open Analytics NV
   
   ===========================================================================
   
   This program is free software: you can redistribute it and/or modify
   it under the terms of the Apache License as published by
   The Apache Software Foundation, either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
   Apache License for more details.
   
   You should have received a copy of the Apache License
   along with this program. If not, see <http://www.apache.org/licenses/>
   
'

#!/bin/sh
mkdir ./docker/testData ./docker/testData/itestGenerated ./docker/testData/itestNewFiles ./docker/testData/itestSourceFiles ./docker/testData/itestTrashFiles
mkdir -m 777 ./downloads
docker-compose -f docker-compose-test.yml up -d
while [ "$(docker inspect -f {{.State.Health.Status}} oa-rdepot-backend)" != "healthy" ]; do
    sleep 1.0;
done;
echo "Backend is ready"