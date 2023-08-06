#!/usr/bin/env python3
"""Defines common features and attributes for all models"""

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime
from uuid import uuid4
from datetime import datetime
from models import storage


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

    def save(self) -> None:
        """Saves the current instance to storage"""
        self.updatedAt = datetime.now()
        storage.new(self)
        storage.save()

    def delete(self) -> None:
        """Deletes the current instance from storage"""
        storage.delete(self)
