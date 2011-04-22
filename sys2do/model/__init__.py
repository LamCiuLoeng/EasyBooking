# -*- coding: utf-8 -*-
import datetime, traceback
import pymongo
from mongokit import Connection, Document

# configuration
MONGODB_HOST = 'localhost'
MONGODB_PORT = 9999
MONGODB_DB = 'CLINIC'

__all__ = ['connection', 'Abstract', 'MONGODB_DB']


# connect to the database
connection = Connection(MONGODB_HOST, MONGODB_PORT)


def _getID(collection):
    def f():
        print "*" * 20
        print collection
        print "_" * 20
        try:
            c = connection.Sequence.one({'name':collection})
            index, c.next = c.next, c.next + 1
            return index
        except:
            traceback.print_exc()
            return None
    return f




@connection.register
class Sequence(Document):
    __database__ = MONGODB_DB
    __collection__ = 'SEQUENCE'

    structure = {
        'name': unicode,
        'next' : int
    }

    required_fields = ['name']
    default_values = {
                      'next' : 1
                      }
    use_dot_notation = True




class Abstract(Document):
    __database__ = MONGODB_DB
    __collection__ = 'ABSTRACT'
    structure = {
        'id': int,
        'active': int,
        'create_time': datetime.datetime,
        'update_time': datetime.datetime,
    }

    required_fields = []

    validators = {

    }
    use_dot_notation = True
    use_autorefs = True


    @classmethod
    def getID(clz):
        c = connection.Sequence.one({'name':clz.__collection__})
        index, c.next = c.next, c.next + 1
        c.save()
        return index


    default_values = {
#                      'id' : connection.Sequence.find_and_modify({'name':__collection__}, {'$inc':{'next':1}})['next'],
#                      'id' : getID(),
                      'active' : 0,
                      'create_time':datetime.datetime.now,
                      }


from auth import *
from logic import *
