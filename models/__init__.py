#!/usr/bin/env python3
"""Initializes the database session"""
from engine.db_storage import DBStroage

storage = DBStorage()
storage.reload()
