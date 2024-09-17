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

#!/bin/bash

for file in /opt/sql_files/*.sql;
do
    echo "Processing $file"
    result=$(basename $file .sql)
    echo "$result"
    psql -v ON_ERROR_STOP=1 -U postgres <<-EOSQL
	    CREATE DATABASE $result;
	    GRANT ALL PRIVILEGES ON DATABASE $result TO postgres;
	EOSQL
	if [ "$result" == "declarative" ]; then
        psql -U postgres -f $file
	fi
	if [ "$result" == "migrations" ]; then
        psql -U postgres -f $file
	fi
done
