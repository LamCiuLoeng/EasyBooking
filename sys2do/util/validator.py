'''
Created on 2011-4-21

@author: cl.lam
'''

__all__ = ["max_length"]

def max_length(length):
    def validate(value):
        if len(value) <= length:
            return True
        raise Exception('%s must be at most %s characters long' % length)
    return validate
