import logging 

logging.basicConfig(level=logging.INFO)

rabbitmq = {
    'host': 'rabbitmq',
    'queue': 'user'
}

DATABASE_URI = "postgresql://postgres:postgres@postgres/"
DATABASE_NAME = 'users'
SQLALCHEMY_DATABASE_URI = "{}{}".format(DATABASE_URI, DATABASE_NAME)
SQLALCHEMY_TRACK_MODIFICATIONS = True

DEBUG = True
