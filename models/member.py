#!/usr/bin/env python3
"""Defines the member schema"""

from base_model import BaseMode, Base
from sqlalchemy import Column, String, Boolean


class Member(BaseModel, Base):
    """The member class"""
    __tablename__ = "members"

    email = Column(String(120), nullable=False)
    projectId = Column(String(60), nullable=False)
    isAdmin = Column(Boolean, nullable=False, default=False)
