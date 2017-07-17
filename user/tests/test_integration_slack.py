import time
import unittest
import json
import requests

import mock
from mock import patch

from app import app, db
from models import User

import random
import string


def randomword(length):
   return ''.join(random.choice(string.ascii_lowercase) for i in range(length))


class IntegrationSlackTest(unittest.TestCase):
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
        resp = requests.get('http://slack/ping')
        self.assertEqual(resp.status_code, 200)
        # Need to decode first to avoid `TypeError: the JSON object must be
        # str, not 'bytes'`
        self.assertEqual(resp.headers['Content-Type'], 'application/json')
        data = resp.json()
        self.assertEqual(data['response'], 'pong')

    def test_send_slack_on_user_created(self):

        data = self.user_data
        resp = self.app.post('/user',  data=json.dumps(data),
                             content_type='application/json')

        self.assertEqual(resp.status_code, 200)
        # Need to decode first to avoid `TypeError: the JSON object must be
        # str, not 'bytes'`
        self.assertEqual(resp.content_type, 'application/json')
        response_json = json.loads(resp.data.decode("utf-8"))
        self.assertEqual(response_json, data)

        # Check if message has been stored in slack (redis)
        response = requests.get('http://slack/messages?channel=%23user')
        self.assertEqual(resp.status_code, 200)
        data = response.json()
        self.assertNotEqual(data, [])
        slack_message = data[0] #Last user inserted
        expected_message = "User {} created".format(self.user_data['email'])
        self.assertEqual(slack_message, expected_message)


if __name__ == '__main__':
    unittest.main()
