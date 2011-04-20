# -*- coding: utf-8 -*-
from flask import g, render_template, flash, session, redirect, url_for, request

from flask import current_app as app


def index():
    app.logger.debug('A value for debugging')
    return render_template("index.html")
