#!/usr/bin/env python3
"""RESTFUL API handler for project actions"""

from models import storage
from api.v1.views import app_views
from flask import request, make_response, abort, jsonify
from models.project import Project
from models.user import User
from models.member import Member


@app_views.route('/projects', strict_slashes=False)
def allProjects():
    """Retrieves all projects from database"""
    projects = storage.all(Project)
    projectList = []

    for project in projects.values():
        projectList.append(project.toDict())

    return make_response(jsonify(projectList), 200)

@app_views.route('/projects/<project_id>', strict_slashes=False)
def projectById(project_id):
    """Retrieves the project with the project_id from databse"""
    project = storage.get(Project, project_id)
    
    if not project:
        abort(404)

    return make_response(jsonify(project.toDict()))

@app_views.route('/projects/<project_id>', methods=['PUT'], strict_slashes=False)
def updateProject(project_id):
    """Updates the project with project_id"""
    projectData = request.get_json()

    if not projectData:
        return make_response(jsonify({"Error": "Not a valid JSON"}), 400)
    
    project = storage.get(Project, project_id)

    if not project:
        abort(404)

    editableFields = ["name", "description"]

    for field, value in projectData.items():
        if field in editableFields:
            setattr(project, field, value)
    
    # if members in projectData:


    project.save()

    return make_response(jsonify(project.toDict()), 200)

@app_views.route('/projects/<user_id>', methods=['POST'], strict_slashes=False)
def createProject(user_id):
    """Creates a new project"""
    projectData = request.get_json()

    if not projectData:
        return make_response(jsonify({"Error": "Not a valid JSON"}), 400)
    
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    requiredFields = ["name", "description"]

    for field in requiredFields:
        if field not in projectData:
            return make_response(
                jsonify({"Error": f"{field} is missing"}), 400)

    projectData['creatorId'] = user_id
    project = Project(**projectData)
    project.save()

    return make_response(jsonify(project.toDict()), 201)
