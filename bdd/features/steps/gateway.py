from behave import given, when, then, step
import requests

from utils import assert_response, assertEqual

@then('I can check health')
def step_impl(context):

    services = ['user', 'slack']

    response = requests.get('http://gateway/health')
    assert_response(response)

    json = response.json()
    for service in services: 
        assert 'error' not in json[service]
        assertEqual( json[service]['response'], 'pong')


