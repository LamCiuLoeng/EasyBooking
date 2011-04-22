# -*- coding: utf-8 -*-
from datetime import datetime as dt
import json, traceback
from webhelpers.paginate import Page

from flask import g, render_template, flash, session, redirect, url_for, request, jsonify
from flask import current_app as app

from sys2do.model import connection



def index():
    app.logger.debug('A value for debugging')
    return render_template("index.html")


def get_clinic_data():
    try:
        conditions = {'active' : 0}
        start = int(request.values.get('start', '0'))
        limit = int(request.values.get("limit", "3"))
        total_data = connection.Clinic.find(conditions)
        data = connection.Clinic.find(conditions)[start:start + limit]

        return jsonify({
                'success' : True,
                'message' : 'Geting the clinic data successfully!',
                'data'    : [{'id':c.id, 'name':c.name, 'image':c.image_url, 'address':c.address, 'location':c.address, 'desc':c.desc}
                             for c in data],
                'total'   : total_data.count()
                })
    except:
        app.logger.error(traceback.format_exc())
        return jsonify({
                'success' : False,
                'message' : 'Error when geting the clinic data!'
                })


def get_user_data():
    try:
        conditions = {'active' : 0}
        start = int(request.values.get('start', '0'))
        limit = int(request.values.get("limit", "3"))
        total_data = connection.User.find(conditions)
        data = connection.User.find(conditions)[start:start + limit]

        return jsonify({
                'success' : True,
                'message' : 'Geting the user data successfully!',
                'data'    : [{'id':c.id, 'email':c.email, 'phone':c.phone, 'image':c.image_url, 'first_name':c.first_name, 'last_name':c.last_name}
                             for c in data],
                'total'   : total_data.count()
                })
    except:
        app.logger.error(traceback.format_exc())
        return jsonify({
                'success' : False,
                'message' : 'Error when geting the user data!'
                })


def delete_object():
    dbobj = request.values.get("type", "")
    id = request.values.get("id", "")
    app.logger.debug(id)
    if not dbobj or not id:
        return jsonify({
                        'success' : False,
                        'message' : 'Required params not exist!'
                        })
    obj = getattr(connection, dbobj).one({'id':int(id), 'active':0})
    app.logger.debug("~~~~~")
    app.logger.debug(obj.id)
    obj.active = 1
    obj.save()
    return jsonify({
                    'sucess' : True,
                    'message' : 'Delete the object successfully!'
                    })


def clinic_location_data():
    data = [{"lat":c.location[0], "lng":c.location[1], "title":c.name} for c in connection.Clinic.find()]
    return render_template("js/clinic_location_data.js", data = data)



events = []

def event_read():
    return jsonify({
                    "success" :True,
                    "message" : "Load data",
                    "total":len(events),
                    "data" : events
                  })


def calendars():
    return jsonify({
                    "calendars" : [{
                                    "id":1,
                                    "title":"Home",
                                    "color":2
                                    }, {
                                       "id":2,
                                        "title":"Work",
                                        "color":22
                                       }, {
                                          "id":3,
                                        "title":"School",
                                        "color":7
                                          }]
                    })


def _filter_booking(start = None, end = None):
    try:
        fields = {'title':True, 'start':True, 'end':True}
        conditions = {'active':0}
        if start : conditions["start"] = {'$gt':start}
        if end : conditions["end"] = {'$lt':end}
        data = [{'title':b.title, 'start':b.start, 'end':b.end} for b in connection.Booking.find(conditions)]
        return {
                "success" :True,
                "message" : "Load data",
                "total":len(data),
                "data" : data
                }
    except:
        app.logger.error(traceback.format_exc())
        return {
                "success" :False,
                "message" : "Error when reading the objects!",
                }



def _create_booking(start, end, title):
    import random
    try:
        b = connection.Booking()
        b.start = start
        b.end = end
        b.title = title
        b.id = random.randint(0, 1000)
        b.save()
        return {
                "success" : True,
                "message" : "Created",
                "data" : {
                          'title' : b.title,
                          'start' : b.start,
                          'end'   : b.end,
                          'id'    : b.id
                          }
                }
    except:
        app.logger.error(traceback.format_exc())
        return {
                "success" : False,
                "message" : "Error when adding the object",
                }


def _update_booking(id, start, end, title):
    try:
        b = connection.Booking.one({'id':id, 'active':0})
        b.start = start
        b.end = end
        b.title = title
        b.save()
        return  {
                "success" : True,
                "message" : "Update the object successfully!",
                "data" : b
                }
    except:
        app.logger.error(traceback.format_exc())
        return {
                "success" : False,
                "message" : "Error when updating the object",
                }


def _remove_booking(id):
    try:
        b = connection.Booking.one({'id':id, 'active':0})
        b.active = 1
        b.save()
        return {
                "success" : True,
                "message" : "Deleting the object successfully!",
                }
    except:
        app.logger.error(traceback.format_exc())
        return {
                "success" : False,
                "message" : "Error when deleting the object",
                }


def calendars_event():
    action = request.values.get("action", None)

    if action == "r":
        app.logger.debug("^^^^^^^^^ r")
        return jsonify(_filter_booking())


    if action.startswith("u"):
        app.logger.debug("^^^^^^^^^ u")
        data = request.values.get("data", "")
        if not data :
            return jsonify({"success" : False, "message":"No data receive!"})

        data = json.loads(data)

        return jsonify(_update_booking(data["id"], data.get("title", None), data.get("start", None), data.get("end", None)))


    if action == "n":
        app.logger.debug("^^^^^^^^^ u")
        data = request.values.get("data", "")
        if not data :
            return jsonify({"success" : False, "message":"No data receive!"})
        data = json.loads(data)
        aa = jsonify(_create_booking(data["start"], data["end"], data["title"]))
        return aa



    if action.startswith("d"):
        app.logger.debug("^^^^^^^^^ d")
        app.logger.debug(request.method)
        data = request.values.get("data", "")
        if not data :
            return jsonify({"success" : False, "message":"No data receive!"})

        data = json.loads(data)
        app.logger.debug(data)

        return jsonify(_remove_booking(data))


def test():

    u = connection.User()
    u.email = request.values.get("email", "")
    u.password = request.values.get("password", "")
    u.save()
    return u.to_json()
