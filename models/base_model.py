#!/usr/bin/env python3
"""Defines common features and attributes for all models"""

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime
from uuid import uuid4
from datetime import datetime


Base = declarative_base()


class BaseModel():
    """Parent model for other models"""
    id = Column(String(60), primary_key=True, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)

    def __init__(self, *args, **kwargs) -> None:
        """Object Constructor"""
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    if key in ['updatedAt', 'createdAt']:
                        setattr(self, key, datetime.fromisoformat(value))
                    else:
                        setattr(self, key, value)
        self.id = str(uuid4())
        self.createdAt = datetime.now()
        self.updatedAt = datetime.now()

    def __str__(self) -> str:
        """Returns a string representation of an instance"""
        return ("[{}] ({}) {}".format
                (type(self).__name__, self.id, self.__dict__))
