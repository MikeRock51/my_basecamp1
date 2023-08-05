#!/usr/bin/env python3
"""The database storage engine"""

from os import getenv
from sqlalchemy import create_engine


class DBStorage:
    """Database storage class"""
    __engine = None
    __session = None

    def __init__(self) -> None:
        user = getenv("BASECAMP_USER")
        host = getenv("BASECAMP_HSOT")
        pwd = getenv("BASECAMP_PWD")
        db = getenv("BASECAMP_DB")

        self.__engine = create_engine(f"mysql+mysqldb://{user}:{pwd}\
                                      @{host}/{db}", pool_pre_ping=True)

    def reload(self):
        """
            Creates all database table if not
            exists and establishes a new session
        """
        pass
