import time
import unittest
import json

import mock
from mock import patch

from app import app, db
from models import User

import random
import string


def randomword(length):
   return ''.join(random.choice(string.ascii_lowercase) for i in range(length))


class UserTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        SQLALCHEMY_DATABASE_URI = "sqlite://"  # Use sqlite for tests
        TESTING = True
        db.create_all()  # Initialize database

        app.config['TESTING'] = True
        self.app = app.test_client()

        random_name = randomword(10)
        self.user_data = {'name': random_name,
                          'email': '{}@email.com'.format(random_name)}

    def tearDown(self):
        db.session.remove()  # Drop sqlite database after tests
        db.drop_all()

    def test_ping(self):
        resp = self.app.get('/ping')
        self.assertEqual(resp.status_code, 200)
        # Need to decode first to avoid `TypeError: the JSON object must be
        # str, not 'bytes'`
        self.assertEqual(resp.content_type, 'application/json')
        data = json.loads(resp.data.decode("utf-8"))
        self.assertEqual(data['response'], 'pong')

    def test_invalid_user(self):

        data = {'foo': 'bar'}
        resp = self.app.post('/user',  data=json.dumps(data),
                             content_type='application/json')

        self.assertEqual(resp.status_code, 400)
        # Need to decode first to avoid `TypeError: the JSON object must be
        # str, not 'bytes'`
        self.assertEqual(resp.content_type, 'application/json')
        response_json = json.loads(resp.data.decode("utf-8"))
        self.assertEqual(response_json['email'],   [
                         'Missing data for required field.'])
        self.assertEqual(response_json['name'],   [
                         'Missing data for required field.'])

    def test_post_user(self):

        data = self.user_data
        resp = self.app.post('/user',  data=json.dumps(data),
                             content_type='application/json')

        self.assertEqual(resp.status_code, 200)
        # Need to decode first to avoid `TypeError: the JSON object must be
        # str, not 'bytes'`
        self.assertEqual(resp.content_type, 'application/json')
        response_json = json.loads(resp.data.decode("utf-8"))
        # Response has the same data requested
        self.assertEqual(response_json, data)

    def test_save_user(self):

        self.test_post_user()
        user = User.query.filter_by(email=self.user_data['email']).first()
        self.assertEqual(user.name, self.user_data['name'])


if __name__ == '__main__':
    unittest.main()
