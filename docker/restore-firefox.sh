#!/bin/bash
#CONTAINER="oa-rdepot-app-without-snapshots";
# rm -rf docker/testData
cp -rf src/__tests__/end-to-end/testData docker/
cd docker/testData && tar -xzf itestSource.tar.gz
rm -rf downloads/

CONTAINER=$(docker ps --format "table {{.ID}}\t{{.Names}}" | tr -s ' ' | cut -d' ' -f1,2 | grep "backend-firefox" | cut -d' ' -f1)
CONTAINER_DB=$(docker ps --format "table {{.ID}}\t{{.Names}}" | tr -s ' ' | cut -d' ' -f1,2 | grep "db-firefox" | cut -d' ' -f1)
CONTAINER_REPO=$(docker ps --format "table {{.ID}}\t{{.Names}}" | tr -s ' ' | cut -d' ' -f1,2 | grep "repo-firefox" | cut -d' ' -f1)
while [ $# -gt 0 ]; do
    case "$1" in
        -s|--snapshots)
            CONTAINER="oa-rdepot-app"
            shift;;
        --)
            break;;
        *)
            printf "Unknown option %s\n" "$1"
            exit 1;;
    esac
done

echo "RESTORING $CONTAINER...";

docker exec $CONTAINER /bin/sh -c "rm -rf /opt/rdepot/repositories; rm -rf /opt/rdepot/generated; mkdir -p /opt/rdepot/repositories; mkdir -p /opt/rdepot/new; mkdir -p /opt/rdepot/generated; mkdir -p /opt/rdepot/trash; cp -fr /opt/testSourceFiles/info/* /opt/rdepot/repositories; cp -fr /opt/testGenerated/repository/* /opt/rdepot/generated; cp -fr /opt/newFiles/new/* /opt/rdepot/new; cp -fr /opt/trashFiles/trash/* /opt/rdepot/trash";

echo "RESTORING $CONTAINER_DB";

docker exec $CONTAINER_DB su - postgres -c "psql -U rdepot rdepot -c 'TRUNCATE public.access_token, public.changed_variable, public.newsfeed_event, public.submission, public.repository_maintainer, public.package_maintainer, public.rpackage, public.package, public.rrepository, public.pythonpackage, public.pythonrepository, public.repository, public.api_token, public.user, public.user_settings'; psql -U rdepot rdepot < /opt/sql_files/rdepot.sql"
docker exec $CONTAINER_REPO /bin/sh -c "rm -r /opt/rdepot/*; cp -rf /opt/testServer/* /opt/rdepot";

if [ $? -eq 0 ]; then
	echo "FILES RESTORED";
fi
