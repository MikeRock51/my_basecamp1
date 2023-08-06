#!/usr/bin/env python3
"""RESTFUL API handler for user actions"""

from models import storage
from api.v1.views import app_views
from flask import request, make_response, abort, jsonify
from models.user import User


@app_views.route('/users', strict_slashes=False)
def allUsers():
    """Returns a json list of all users"""
    users = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        users.append(user.toDict())

    return make_response(jsonify(users), 200)

