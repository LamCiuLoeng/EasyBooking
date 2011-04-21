# -*- coding: utf-8 -*-

from sys2do.model import connection, MONGODB_DB
import sys2do.model.auth as auth
import sys2do.model.logic as logic

def init():
    db = getattr(connection, MONGODB_DB)
    objects = []
    objects.extend([getattr(auth, name) for name in auth.__all__])
    objects.extend([getattr(logic, name) for name in logic.__all__])

    #clear the DB
    for o in objects:
        print str(o)
        db.drop_collection(o.__collection__)



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
    admin.save()

    radmin = connection.Role()
    radmin.name = u'Administrator'
    radmin.users = [admin.id]
    radmin.save()

    rdoctor = connection.Role()
    rdoctor.name = u'Doctor'
    rdoctor.save()

    rnurse = connection.Role()
    rnurse.name = u'Nurse'
    rnurse.save()

    ruser = connection.Role()
    ruser.name = u'Normal User'
    ruser.save()


    c1 = connection.Clinic()
    c1.name = u'Clinic 1'
    c1.location = (22.396428, 114.1094970)
    c1.save()

    c2 = connection.Clinic()
    c2.name = u'Clinic 2'
    c2.location = (22.396428, 114.0094970)
    c2.save()

    c3 = connection.Clinic()
    c3.name = u'Clinic 3'
    c3.location = (22.296428, 114.0094970)
    c3.save()

    c4 = connection.Clinic()
    c4.name = u'Clinic 4'
    c4.location = (22.286428, 114.1094970)
    c4.save()

    c5 = connection.Clinic()
    c5.name = u'Clinic 5'
    c5.location = (22.284428, 114.1094970)
    c5.save()


    print "*" * 20
    print "finish"
    print "_" * 20

if __name__ == '__main__':
    init()
