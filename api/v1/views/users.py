#!/usr/bin/env python3
"""RESTFUL API handler for user actions"""

from models import storage
from api.v1.views import app_views
from flask import request, make_response, abort, jsonify
from models.user import User
import bcrypt


@app_views.route('/users', strict_slashes=False)
def allUsers():
    """Returns a json list of all users"""
    users = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        users.append(user.toDict())

    return make_response(jsonify(users), 200)


@app_views.route('/users/<user_id>')
def userById(user_id):
    """Retrieves the user with the user_id"""
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    return make_response(jsonify(user.toDict()), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def createUser():
    """Creates a new user"""
    userInfo = request.get_json()
    if not userInfo:
        return make_response(jsonify({"Error": "Not a JSON"}), 400)

    requiredFields = ["name", "email", "password"]

    for field in requiredFields:
        if field not in userInfo:
            return make_response(jsonify(
                {"Error": f"{field} is missing"}), 400)

    hashedPassword = bcrypt.hashpw(userInfo['password'].encode('UTF-8'),
                                   bcrypt.gensalt())
    userInfo['password'] = str(hashedPassword, "UTF-8")
    user = User(**userInfo)
    user.save()

    return make_response(jsonify(user.toDict()), 201)
