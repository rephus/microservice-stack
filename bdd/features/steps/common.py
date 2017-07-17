# -- FILE: features/steps/example_steps.py
from behave import given, when, then, step
import requests

from utils import assert_response, assertEqual

@then('I can ping {service}')
def step_impl(context, service):
    response = requests.get('http://{}/ping'.format(service))
    assert_response(response)
    assertEqual( response.json(), {'response': 'pong'})
