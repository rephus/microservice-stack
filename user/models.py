from app import db, ma
from marshmallow import Schema, fields

class User(db.Model):
    #__tablename__ = 'user'
    def __init__(self, name, email):
        self.name = name
        self.email = email

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(64), unique=True)


class UserSchema(ma.Schema):
    # https://flask-marshmallow.readthedocs.io/en/latest/
    class Meta:
        fields = ('name', 'email')
    name = fields.Str(required=True)
    email = fields.Str(required=True)
    
user_schema = UserSchema()
users_schema = UserSchema(many=True)