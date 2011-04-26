var clinic_store = new Ext.data.JsonStore({
    url : '/get_clinic_data',
    root : 'data',
    totalProperty:'total',
    idProperty:'id',
    remoteSort: true,
    fields: [
            'id',
	        'image',
	        'name',
	        'location',
	        'address',
	        'desc'
        ]
});

var clinic_management_config = {
    title: 'Clinic Management',
    id:'tab_clinic_management',
    closable:true,
    xtype:'grid',
    store : clinic_store,
    colModel:new Ext.grid.ColumnModel({
        defaultSortable:false,
        columns:[
            {header:'Name',dataIndex:'name',width: 300},
            {header:'Address',dataIndex:'address',width: 600}
        ]
    }),
    //view:new Ext.grid.GroupingView(),
    sm:new Ext.grid.RowSelectionModel({
        singleSelect:true,
        listeners:{
            rowselect:function(sm,index,record){
                var main_tabs = Ext.getCmp("main_tabs");
                var sel = sm.getSelected();                
                var t = main_tabs.findById('tab_clinic_'+sel.data.id);
                if(t){
                    main_tabs.setActiveTab(t);
                }else{ 
	                main_tabs.add({
	                   title :sel.data.name,
	                   id:'tab_clinic_'+sel.data.id,
	                   xtype:'form',
                       closable:true,
	                   items:[{
                           xtype : 'hidden',
                           name : 'id',
                           value: sel.data.id,
                           ref:'form_id'
                       },{
	                       xtype : 'textfield',
	                       fieldLabel:'Name',
	                       name : 'name',
	                       value: sel.data.name,
	                       allowBlank : false,
	                       ref:'form_name',
                           width:250
	                   },{
	                        xtype : 'textfield',
	                        fieldLabel:'Address',
	                        name : 'address',
	                        value:sel.data.address,
	                        allowBlank : false,
	                        ref:'form_address',
                            width:250
	                    },{
	                        xtype:'htmleditor',
	                        name:'desc',
	                        fieldLabel:'Description',
	                        value:sel.data.desc,
	                        height:100,
	                        anchor:'100%',
	                        ref:'form_desc'
	                    }],
	                    buttons:[{
	                        text:"Save",
	                        handler:function(btn){
                                var f = btn.findParentByType('form');                                    
                                Ext.Ajax.request({
                                    url:'/update_clinic',
                                    params:{
                                        type : 'Clinic',
                                        id:f.form_id.getValue(),
                                        name: f.form_name.getValue(),
                                        address: f.form_address.getValue(),
                                        desc: f.form_desc.getValue()
                                    },
                                    success:function(result, request){
                                        try{
                                            var r = Ext.util.JSON.decode(result.responseText);
                                            if(r.success){
                                                var main_tabs = Ext.getCmp("main_tabs");
                                                var clinic_tab = Ext.getCmp("tab_clinic_management");
                                                clinic_tab.getSelectionModel().clearSelections();
                                                main_tabs.remove(f);
                                                clinic_store.reload();
                                            }
                                            Ext.Msg.alert(r.message)   
                                        }catch (err){
                                            Ext.Msg.alert("Can't decode the result from the server !");                                            
                                        }
                                    },
                                    failure:function(result, request){
                                        Ext.Msg.alert('Error','Unable to save the record!')
                                    }
                                });
	                            //Ext.Msg.alert("save");
	                        }
	                    },{
	                        text:"Cancel",
	                        handler:function(){
                                var btn_cancel = this;
	                            Ext.Msg.show({
                                    title:'Warning',
                                    buttons:Ext.MessageBox.YESNOCANCEL,
                                    msg:'Are you sure to leave the page without saving your input ?',
                                    fn:function(btn){
                                        if(btn == 'yes'){
                                            var main_tabs = Ext.getCmp("main_tabs"); 
                                            var f = btn_cancel.findParentByType('form')
                                            main_tabs.remove(f);   
                                        }
                                    }
                                });
	                        }
	                    }]
	                }).show();
                }
            }
        }
    }),
    bbar:new Ext.PagingToolbar({
        pageSize : 10,
        store:clinic_store,
        displayMsg: 'Displaying clinic info {0} - {1} of {2}',
        displayInfo: true,
        emptyMsg: "No clinic to display"
    }),
    tbar: new Ext.Toolbar({
        items:['->',{
            text:'Add Clinic',
            handler:function(btn){
                var main_tabs = Ext.getCmp("main_tabs");
                var new_tab = main_tabs.findById("tab_new_clinic");
                if(new_tab){
                    main_tabs.setActiveTab(new_tab);
                }else{
                    main_tabs.add({
                        id:'tab_new_clinic',
                        title:'New clinic',
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
                            xtype : 'textfield',
                            fieldLabel:'Address',
                            name : 'address',
                            allowBlank : false,
                            ref:'form_address',
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
                                    var f = btn.findParentByType('form');                                    
                                    Ext.Ajax.request({
	                                    url:'/new_clinic',
	                                    params:{
	                                        type : 'Clinic',
	                                        name: f.form_name.getValue(),
                                            address: f.form_address.getValue(),
                                            desc: f.form_desc.getValue()
	                                    },
	                                    success:function(result, request){
                                            try{
                                                var r = Ext.util.JSON.decode(result.responseText);
		                                        if(r.success){
	                                                var main_tabs = Ext.getCmp("main_tabs");
	                                                var new_tab = main_tabs.findById("tab_new_clinic");
	                                                main_tabs.remove(new_tab);
                                                    clinic_store.reload();
	                                            }
	                                            Ext.Msg.alert(r.message)
	                                                 
                                            }catch (err){
                                                Ext.Msg.alert("Can't decode the result from the server !");                                            
                                            }
	                                    },
	                                    failure:function(result, request){
	                                        Ext.Msg.alert('Error','Unable to save the record!')
	                                    }
	                                });
                                }
                            },
                            {
                                text:"Cancel",
                                handler:function(){
                                    Ext.Msg.show({
                                        title:'Warning ?',
                                        buttons:Ext.MessageBox.YESNOCANCEL,
                                        msg:'Are you sure to leave the page without saving your input ?',
                                        fn:function(btn){
                                            if(btn == 'yes'){
                                                var main_tabs = Ext.getCmp("main_tabs");
                                                var new_tab = main_tabs.findById("tab_new_clinic");
                                                main_tabs.remove(new_tab);   
                                            }
                                        }
                                    });
                                }
                            }
                        ]
                    }).show();
                }
            }
        },{
            text:'Remove Clinic',
            handler:function(btn){
                var grid = Ext.getCmp("tab_clinic_management");
                var sm = Ext.getCmp("tab_clinic_management").getSelectionModel();
                var sel = sm.getSelected();
                if(sm.hasSelection()){
                    Ext.Msg.show({
                        title : 'Delete Clinic?',
                        buttons:Ext.MessageBox.YESNOCANCEL,
                        msg:'Remove the clinic ['+sel.data.name+'] ? All the docutors and nurses belong to this clinic would be inactive !',
                        fn:function(btn){
                            if(btn == 'yes'){
                                Ext.Ajax.request({
                                    url:'/delete_object',
                                    params:{
                                        type : 'Clinic',
                                        id:sel.data.id
                                    },
                                    success:function(resp,opt){
                                        grid.getStore().remove(sel);
                                        grid.getStore().reload();
                                    },
                                    failure:function(resp,opt){
                                        Ext.Msg.alert('Error','Unable to delete the record!')
                                    }
                                });
                            }
                        }
                    });
                }else{
                    Ext.Msg.alert("No record selected!")
                }
            }
        }]
    })
}
