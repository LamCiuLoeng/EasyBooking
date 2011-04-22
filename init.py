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

    radmin = connection.Role()
    radmin.name = u'Administrator'
    radmin.users = [admin.id]
    radmin.id = radmin.getID()
    radmin.save()

    rdoctor = connection.Role()
    rdoctor.name = u'Doctor'
    rdoctor.id = rdoctor.getID()
    rdoctor.save()

    rnurse = connection.Role()
    rnurse.name = u'Nurse'
    rnurse.id = rnurse.getID()
    rnurse.save()

    ruser = connection.Role()
    ruser.name = u'Normal User'
    ruser.id = ruser.getID()
    ruser.save()


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


    print "*" * 20
    print "finish"
    print "_" * 20

if __name__ == '__main__':
    init()
