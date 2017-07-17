import requests

from flask import Flask, Response, jsonify, request
from app import app, db
from models import User, user_schema, UserSchema
import logging

logger = logging.getLogger()


#print("User ", User.query().all())

@app.route("/ping", methods=['GET'])
def ping():
    return jsonify({'response': 'pong'})


@app.route("/user", methods=['POST'])
def post_user():
    """
    Create user into database via POST

    :param email: (Required) unique email for the user
    :param name: (Required) user name
    :returns: If successful return user as JSON
    """
    logger.debug("POST /user {}".format(request.__dict__))
    data = request.get_json()  # a multidict containing POST data

    # User field validation using marshmallow schema
    data, errors = user_schema.load(data)
    if errors:
        return jsonify(errors), 400

    user = User(**data)
    db.session.add(user)
    db.session.commit()

    # This can be done asynchronously
    requests.post('http://slack/', json={
        'message': "User {} created".format(user.email ) ,
        'channel': "#user"
    })

    return user_schema.jsonify(user)
