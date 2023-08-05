#!/usr/bin/env python3
"""Defines the member schema"""

from base_model import BaseMode, Base
from sqlalchemy import Column, String


class Member(BaseModel, Base):
    """The member class"""
    __tablename__ = "members"
