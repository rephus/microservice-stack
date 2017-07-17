## User service

Create users via REST and store them on PostgreSQL 

## Run 

    docker-compose up user 

## Create a user via POST 

    curl -X POST http://localhost:8101/user -d '{"name": "foo", "email": "bar"}'  -H  'Content-Type: application/json'


## Documentation

Create database from python https://stackoverflow.com/questions/29507792/creating-databases-in-sqlalchemy-tests-with-postgresql
