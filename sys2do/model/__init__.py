# -*- coding: utf-8 -*-
import datetime
import pymongo
from mongokit import Connection, Document

# configuration
MONGODB_HOST = 'localhost'
MONGODB_PORT = 9999
MONGODB_DB = 'CLINIC'

__all__ = ['connection', 'Abstract', 'MONGODB_DB']


# connect to the database
connection = Connection(MONGODB_HOST, MONGODB_PORT)

class Abstract(Document):
    __database__ = MONGODB_DB
    __collection__ = 'ABSTRACT'
    structure = {
        'id': pymongo.objectid.ObjectId,
        'active': int,
        'create_time': datetime.datetime,
        'update_time': datetime.datetime,
    }

    required_fields = []
    default_values = {
                      'active' : 0,
                      'create_time':datetime.datetime.now,
                      }

    validators = {

    }
    use_dot_notation = True
    use_autorefs = True


