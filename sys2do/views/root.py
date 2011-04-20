# -*- coding: utf-8 -*-
from datetime import datetime as dt
import json
from flask import g, render_template, flash, session, redirect, url_for, request, jsonify
from flask import current_app as app


def index():
    app.logger.debug('A value for debugging')
    return render_template("index.html")


def clinic_location_data():
    data = [
            {
             "id"  : 1,
             "lat" : 22.396428,
             "lng" : 114.1094970,
             "title" : 'C1'
            },
            {
             "id" : 2,
             "lat": 22.396428,
             "lng": 114.0094970,
             "title": 'C2'
             },
             {
              "id" : 3,
              "lat": 22.296428,
              "lng": 114.0094970,
              "title": 'C3'
             },
             {
              "id" : 4,
              "lat": 22.286428,
              "lng": 114.1094970,
              "title": 'C4'
              }
            ]
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





def _create_event(start, end, title):
    import random
    tmp = {
          "start" : start,
          "end":end,
          "title":title,
          "id": random.randint(1, 1000)
          }
    events.append(tmp)

    return {
            "success" : True,
            "message" : "Created",
            "data" : tmp
            }


def calendars_event():
    action = request.values.get("action", None)
    if action == "r":
        return event_read()
    if action.startswith("u"):
        app.logger.debug("^^^^^^^^^ u")
        data = request.values.get("data", "")
        if not data :
            return jsonify({"success" : False, "message":"No data receive!"})

        data = json.loads(data)
        items = filter(lambda item:item["id"] == data["id"], events)
        if not items:
            return jsonify({"success" : False, "message":"No such record!"})
        record = items[0]
        record["title"] = data["title"]
        record["start"] = data["start"]
        record["end"] = data["end"]
        return jsonify({
               "success" : True,
               "message" : "Update successfully",
               "data" : record
               })

    if action == "n":
        data = request.values.get("data", "")
        if not data :
            return jsonify({"success" : False, "message":"No data receive!"})
        data = json.loads(data)
        aa = jsonify(_create_event(data["start"], data["end"], data["title"]))
        app.logger.debug(aa)
        return aa
    if action.startswith("d"):
        app.logger.debug("^^^^^^^^^ d")
        app.logger.debug(request.method)
        data = request.values.get("data", "")
        if not data :
            return jsonify({"success" : False, "message":"No data receive!"})

        data = json.loads(data)
        events = filter(lambda item:item["id"] != data, events)
        return jsonify({
               "success" : True,
               "message" : "Delete successfully",
               })
