#!/usr/bin/env bash
rm -rf downloads/

CONTAINER=$(docker ps --format "table {{.ID}}\t{{.Names}}"  | tr -s ' ' | cut -d' ' -f1,2 | grep "backend-chrome" | cut -d' ' -f1)
CONTAINER_DB=$(docker ps --format "table {{.ID}}\t{{.Names}}"  | tr -s ' ' | cut -d' ' -f1,2 | grep "db-chrome" | cut -d' ' -f1)
CONTAINER_REPO=$(docker ps --format "table {{.ID}}\t{{.Names}}"  | tr -s ' ' | cut -d' ' -f1,2 | grep "repo-chrome" | cut -d' ' -f1)

echo "RESTORING $CONTAINER...";

docker exec -u rdepot "$CONTAINER" /bin/sh -c "rm -rf /opt/rdepot/repositories/*; rm -rf /opt/rdepot/generated/*; mkdir -p /opt/rdepot/trash; cp -fr /opt/testSourceFiles/info/* /opt/rdepot/repositories; cp -fr /opt/testGenerated/repository/* /opt/rdepot/generated; cp -fr /opt/newFiles/new/* /opt/rdepot/new; cp -fr /opt/trashFiles/trash/* /opt/rdepot/trash" &
if [ $? -eq 0 ]; then
	echo "BACKEND CONTAINER RESTORED";
fi

echo "RESTORING $CONTAINER_DB";

docker exec "$CONTAINER_DB" su - postgres -c "psql -U rdepot rdepot -c 'TRUNCATE public.access_token, public.changed_variable, public.newsfeed_event, public.submission, public.repository_maintainer, public.package_maintainer, public.rpackage, public.package, public.rrepository, public.pythonpackage, public.pythonrepository, public.repository, public.package_package_maintainer, public.api_token, public.user, public.user_settings'; psql -U rdepot rdepot < /opt/sql_files/rdepot.sql" &
if [ $? -eq 0 ]; then
	echo "DB CONTAINER RESTORED";
fi

docker exec -u rdepot "$CONTAINER_REPO" /bin/sh -c "rm -r /opt/rdepot/*; cp -rf /opt/testServer/* /opt/rdepot" &
wait

if [ $? -eq 0 ]; then
	echo "FILES RESTORED";
fi
