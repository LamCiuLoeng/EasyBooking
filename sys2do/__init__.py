# -*- coding: utf-8 -*-

from flask import Flask, Module

__all__ = ["app"]

app = Flask(__name__, static_path = '/static')
app.debug = True


#===============================================================================
# sys.py
#===============================================================================
import views.sys as s
for error_code in [403, 404, 500] : app.error_handlers[error_code] = s.error_page(error_code)


#===============================================================================
# root.py
#===============================================================================
import views.root as r
app.add_url_rule("/", view_func = r.index)