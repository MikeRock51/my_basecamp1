#!/usr/bin/env python3
"""The database storage engine"""

from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from typing import Dict


class DBStorage:
    """Database storage class"""
    __engine = None
    __session = None

    def __init__(self) -> None:
        user = getenv("BASECAMP_USER")
        host = getenv("BASECAMP_HOST")
        pwd = getenv("BASECAMP_PWD")
        db = getenv("BASECAMP_DB")

        self.__engine = create_engine(f"mysql+mysqldb://{user}:{pwd}\
                                      @{host}/{db}", pool_pre_ping=True)

    def reload(self) -> None:
        """
            Creates all database table if not
            exists and establishes a new session
        """
        from base_model import Base
        allModels = self.allModels()

        Base.metadata.create_all(self.__engine)
        sessionFactory = sessionmaker(bind=self.__engine,
                                      expire_on_commit=False)
        self.__session = scoped_session(sessionFactory)

    def allModels(self) -> Dict:
        """Returns a dictionary of all app models"""
        from user import User
        from project import Project
        from member import Member

        return {
            "User": User,
            "Project": Project,
            "Member": Member
        }
