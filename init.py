# -*- coding: utf-8 -*-

from sys2do.model import connection, MONGODB_DB, Sequence
import sys2do.model.auth as auth
import sys2do.model.logic as logic

def init():
    db = getattr(connection, MONGODB_DB)
    objects = [Sequence]
    objects.extend([getattr(auth, name) for name in auth.__all__])
    objects.extend([getattr(logic, name) for name in logic.__all__])

    print "*" * 20
    print "drop all collection"
    print "_" * 20
    #clear the DB
    for o in objects:
        print str(o)
        db.drop_collection(o.__collection__)

    print "*" * 20
    print "Init the sequence"
    print "_" * 20
    #init the seq
    for o in objects:
        seq = connection.Sequence()
        seq.name = unicode(o.__collection__)
        seq.save()


    print "*" * 20
    print "Adding the default data"
    print "_" * 20
    #init the permission
    pcreate_clinic = connection.Permission()
    pcreate_clinic.name = u'CREATE_CLINIC'
    pcreate_clinic.save()

    padd_user = connection.Permission()
    padd_user.name = u'ADD_USER'
    padd_user.save()

    pdelete_user = connection.Permission()
    pdelete_user.name = u'DELETE_NAME'
    pdelete_user.save()

    pdelete_role = connection.Permission()
    pdelete_role.name = u'DELETE_ROLE'
    pdelete_role.save()

    pview_all_clinic = connection.Permission()
    pview_all_clinic.name = u'VIEW_ALL_CLINIC'
    pview_all_clinic.save()

    pview_order = connection.Permission()
    pview_order.name = u'VIEW_ORDER'
    pview_order.save()





    #add the init value into db
    admin = connection.User()
    admin.email = u'aa@aa.com'
    admin.password = u'aa'
    admin.id = admin.getID()
    admin.save()

    temp1 = connection.User()
    temp1.email = u'temp1@aa.com'
    temp1.password = u'aa'
    temp1.id = temp1.getID()
    temp1.first_name = u"Temp1"
    temp1.last_name = u"KK"
    temp1.save()

    temp2 = connection.User()
    temp2.email = u'temp2@aa.com'
    temp2.password = u'aa'
    temp2.id = temp2.getID()
    temp2.first_name = u"Temp2"
    temp2.last_name = u"KK"
    temp2.save()

    temp3 = connection.User()
    temp3.email = u'temp3@aa.com'
    temp3.password = u'aa'
    temp3.id = temp3.getID()
    temp3.first_name = u"Temp3"
    temp3.last_name = u"KK"
    temp3.save()

    temp4 = connection.User()
    temp4.email = u'temp4@aa.com'
    temp4.password = u'aa'
    temp4.id = temp4.getID()
    temp4.first_name = u"Temp4"
    temp4.last_name = u"KK"
    temp4.save()

    radmin = connection.Role()
    radmin.name = u'ADMINISTRATOR'
    radmin.display = u'Administrator'
    radmin.users = [admin.id]
    radmin.id = radmin.getID()
    radmin.save()

    rdoctor = connection.Role()
    rdoctor.name = u'DOCTOR'
    rdoctor.displayname = u'Doctor'
    rdoctor.id = rdoctor.getID()
    rdoctor.save()

    rnurse = connection.Role()
    rnurse.name = u'NURSE'
    rnurse.displayname = u'Nurse'
    rnurse.id = rnurse.getID()
    rnurse.save()

    ruser = connection.Role()
    ruser.name = u'NORMALUSER'
    ruser.displayname = u'Normal User'
    ruser.id = ruser.getID()
    ruser.save()

    rtemp = connection.Role()
    rtemp.name = u'TEMPUSER'
    rtemp.displayname = u'Temp User'
    rtemp.id = rtemp.getID()
    rtemp.users = [temp1.id, temp2.id]
    rtemp.save()


    c1 = connection.Clinic()
    c1.id = c1.getID()
    c1.address = u"C1 Address"
    c1.name = u'Clinic 1'
    c1.location = (22.396428, 114.1094970)
    c1.save()

    c2 = connection.Clinic()
    c2.id = c2.getID()
    c2.address = u"C2 Address"
    c2.name = u'Clinic 2'
    c2.location = (22.396428, 114.0094970)
    c2.save()

    c3 = connection.Clinic()
    c3.id = c3.getID()
    c3.name = u'Clinic 3'
    c3.address = u"C3 Address"
    c3.location = (22.296428, 114.0094970)
    c3.save()

    c4 = connection.Clinic()
    c4.id = c4.getID()
    c4.address = u"C4 Address"
    c4.name = u'Clinic 4'
    c4.location = (22.286428, 114.1094970)
    c4.save()

    c5 = connection.Clinic()
    c5.id = c5.getID()
    c5.name = u'Clinic 5'
    c1.address = u"C5 Address"
    c5.location = (22.284428, 114.1094970)
    c5.save()


    d1 = connection.DoctorProfile()
    d1.id = d1.getID()
    d1.uid = temp1.id
    d1.desc = u"I'm temp 1 doctor."
    d1.clinic = [c1.id]
    d1.save()

    d2 = connection.DoctorProfile()
    d2.id = d2.getID()
    d2.uid = temp2.id
    d2.desc = u"I'm temp 2 doctor."
    d2.clinic = [c1.id]
    d2.save()

    d3 = connection.DoctorProfile()
    d3.id = d3.getID()
    d3.uid = temp3.id
    d3.desc = u"I'm temp 3 doctor."
    d3.clinic = [c1.id]
    d3.save()

    d4 = connection.DoctorProfile()
    d4.id = d4.getID()
    d4.uid = temp4.id
    d4.desc = u"I'm temp 4 doctor."
    d4.clinic = [c2.id]
    d3.save()

    c1.doctors = [d1.id, d2.id, d3.id]
    c2.doctors = [d4.id]
    c1.save()
    c2.save()

    print "*" * 20
    print "finish"
    print "_" * 20

if __name__ == '__main__':
    init()
