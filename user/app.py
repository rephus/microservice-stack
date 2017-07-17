import json
import time
from flask import Flask, Response, jsonify, request
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

import settings

import logging

logger = logging.getLogger()

## Setup Database
# https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/
# http://killtheyak.com/use-postgresql-with-django-flask/
app.config.from_pyfile('settings.py')
db = SQLAlchemy(app)


ma = Marshmallow(app)

from views import * 

#send_message("{} user start".format(int(time.time())) )

if __name__ == "__main__":

    logger.info("Started service on port 80")
    app.run(host='0.0.0.0', port=80)
# On exit, close rabbitmq connection
#connection.close()
