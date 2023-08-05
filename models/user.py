#!/usr/bin/env python3
"""Defines the user model schema"""

from base_model import BaseModel, Base
from sqlalchemy import Column, String


class User(BaseModel, Base):
    """The user class"""

