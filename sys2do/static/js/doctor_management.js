var doctor_store = new Ext.data.JsonStore({
    url : '/get_doctor_data',
    root : 'data',
    totalProperty:'total',
    idProperty:'id',
    remoteSort: true,
    fields: [
            'id',
            'uid',
            'desc',
            'name',
            'clinic',
            'category'
        ]
});


var doctor_management_config = {
    title : 'Doctor Management',
    id:'tab_doctor_management',
    closable:true,
    xtype:'grid',
    store : doctor_store,
    colModel:new Ext.grid.ColumnModel({
        defaultSortable:false,
        columns:[
            {header:'Name',dataIndex:'name',width: 300},
            {header:'Clinic',dataIndex:'clinic',width: 300},
            {header:'Category',dataIndex:'category',width: 300}
        ]
    }),
    sm:new Ext.grid.RowSelectionModel({
    
    }),
    bbar:new Ext.PagingToolbar({
        pageSize : 10,
        store:doctor_store,
        displayMsg: 'Displaying doctor info {0} - {1} of {2}',
        displayInfo: true,
        emptyMsg: "No doctor to display"
    }),
    tbar: new Ext.Toolbar({
        items:['->',{
            text:'Add Doctor',
            handler:function(btn){
                var main_tabs = this.findParentByType('tabpanel');
                var tab_new_doctor = main_tabs.findById("tab_new_doctor");
                if(tab_new_doctor){
                    main_tabs.setActiveTab(tab_new_doctor);
                }else{
                    main_tabs.add({
                        title : 'New doctor',
                        id:'tab_new_doctor',
                        xtype:'form',
                        closable:true,
                        items:[{
                            xtype : 'textfield',
                            fieldLabel:'Name',
                            name : 'name',
                            allowBlank : false,
                            ref:'form_name',
                            width:250
                        },{
                            xtype:'htmleditor',
                            name:'desc',
                            fieldLabel:'Description',
                            //hideLabel:true,
                            height:100,
                            anchor:'100%',
                            ref:'form_desc'
                        }],
                        buttons:[{
                            text:"Save",
                            handler:function(btn){
                                Ext.Msg.alert("Save")
                            }
                        },{
                            text:"Cancel",
                            handler:function(btn){
                                Ext.Msg.alert("Cancel")
                            }
                        }]
                    }).show();
                }
            }
        },{
            text:'Delete Doctor',
            handler:function(btn){
                var t = this.findParentByType('grid');
                var sm = t.getSelectionModel();
                var sel = sm.getSelected();
                if(sm.hasSelection()){
                    Ext.Msg.show({
                        title : 'Delete Doctor?',
                        buttons:Ext.MessageBox.YESNOCANCEL,
                        msg:'Remove the doctor ['+sel.data.name+'] ?',
                        fn:function(b){
                            Ext.Ajax.request({
                                url:'/delete_object',
                                params:{
                                    type:'DoctorProfile',
                                    id:sel.data.id
                                },
                                success:function(resp,opt){
                                    t.getStore().remove(sel);
                                    t.getStore().reload();
                                },
                                failure:function(resp,opt){
                                    Ext.Msg.alert('Error','Unable to delete the record!')
                                }
                            });
                        }
                    });             
                }
            }
        }]
    })
};