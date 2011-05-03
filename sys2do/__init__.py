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

app.add_url_rule("/test", view_func = r.test)

app.add_url_rule("/", view_func = r.index)
app.add_url_rule("/index", view_func = r.index)
app.add_url_rule("/login", view_func = r.login)
app.add_url_rule("/login_handler", view_func = r.login_handler, methods = ['GET', 'POST'])
app.add_url_rule("/logout_handler", view_func = r.logout_handler, methods = ['GET', 'POST'])


app.add_url_rule("/get_clinic_data", view_func = r.get_clinic_data, methods = ['GET', 'POST'])
app.add_url_rule("/get_one_clinic", view_func = r.get_one_clinic, methods = ['GET', 'POST'])
app.add_url_rule("/get_all_clinic", view_func = r.get_all_clinic, methods = ['GET', 'POST'])
app.add_url_rule("/get_user_data", view_func = r.get_user_data, methods = ['GET', 'POST'])
app.add_url_rule("/get_doctor_data", view_func = r.get_doctor_data, methods = ['GET', 'POST'])
app.add_url_rule("/get_nurse_data", view_func = r.get_nurse_data, methods = ['GET', 'POST'])


app.add_url_rule("/delete_object", view_func = r.delete_object, methods = ['GET', 'POST'])
app.add_url_rule("/new_clinic", view_func = r.new_clinic, methods = ['GET', 'POST'])
app.add_url_rule("/update_clinic", view_func = r.update_clinic, methods = ['POST'])


app.add_url_rule("/clinic_location_data.js", view_func = r.clinic_location_data)
app.add_url_rule("/event_read", view_func = r.event_read)
app.add_url_rule("/calendars.json", view_func = r.calendars, methods = ['GET', 'POST'])
app.add_url_rule("/calendars_event", view_func = r.calendars_event, methods = ['GET', 'POST', 'PUT', 'DELETE'])


app.add_url_rule("/new_nurse", view_func = r.new_nurse, methods = ['GET', 'POST'])

app.add_url_rule("/get_temp_user", view_func = r.get_temp_user, methods = ['GET', 'POST'])

