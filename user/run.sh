#!/bin/sh


## TODO replace with https://stackoverflow.com/questions/29507792/creating-databases-in-sqlalchemy-tests-with-postgresql
PGPASSWORD=postgres \
psql -h postgres -U postgres -c "CREATE DATABASE users"  2> /dev/null

# Apply migrations everytime service starts (if needed)
python manage.py db migrate 
python manage.py db upgrade 

python app.py