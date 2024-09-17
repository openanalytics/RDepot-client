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

#!/bin/bash
CONTAINER=$(docker ps | tr -s ' ' | cut -d' ' -f1,2 | grep "app$" | cut -d' ' -f1)
CONTAINER_DB=$(docker ps | tr -s ' ' | cut -d' ' -f1,2 | grep "postgres" | cut -d' ' -f1)
CONTAINER_REPO=$(docker ps | tr -s ' ' | cut -d' ' -f1,2 | grep "repo" | cut -d' ' -f1)
while [ $# -gt 0 ]; do
    case "$1" in
        -s|--snapshots)
            CONTAINER="oa-rdepot-backend"
            shift;;
        --)
            break;;
        *)
            printf "Unknown option %s\n" "$1"
            exit 1;;
    esac
done

echo "RESTORING BACK-END CONTAINER...";

docker exec $CONTAINER /bin/bash -c "rm -rf /opt/rdepot/repositories; rm -rf /opt/rdepot/generated; mkdir -p /opt/rdepot/repositories; mkdir -p /opt/rdepot/new; mkdir -p /opt/rdepot/generated; cp -fr /opt/testSourceFiles/info/* /opt/rdepot/repositories; cp -fr /opt/testGenerated/repository/* /opt/rdepot/generated; cp -fr /opt/newFiles/new/* /opt/rdepot/new"

echo "RESTORING DB...";

docker exec $CONTAINER_DB su - postgres -c "psql rdepot -c 'TRUNCATE public.access_token, public.changed_variable, public.newsfeed_event, public.submission, public.repository_maintainer, public.package_maintainer, public.rpackage, public.package, public.rrepository, public.pythonpackage, public.pythonrepository, public.repository, public.api_token, public.user, public.user_settings'; psql rdepot < /opt/sql_files/rdepot.sql"
docker exec $CONTAINER_REPO /bin/sh -c "rm -r /opt/rdepot/*; cp -rf /opt/testServer/* /opt/rdepot";

if [ $? -eq 0 ]; then
	echo "FILES RESTORED";
fi
