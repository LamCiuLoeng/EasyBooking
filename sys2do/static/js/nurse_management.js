var nurse_store = new Ext.data.JsonStore({
    url : '/get_nurse_data',
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


var clinic_combo = new Ext.form.ComboBox({
    fieldLabel : 'Clinic',
    width :300,
    emptyText  : 'Select which clinic the nurse belong to',
    name:'clinic_id',
    mode:'remote',
    triggerAction: 'all',
    store:new Ext.data.JsonStore({
        url : '/get_all_clinic',
        root : 'data',
        totalProperty:'total',
        idProperty:'id',
        fields: [
                {name: 'id',mapping:'id'},
                {name:'name',mapping:'name'}
            ]
    }),
    valueField:'id',
    displayField:'name',
    ref:'form_clinic_id'
});


var user_combo = new Ext.form.ComboBox({
    fieldLabel : 'User',
    width:300,
    emptyText  : 'Select the usre to be a nurse',
    editable: false,
    name:'user_id',
    mode : 'remote',
    triggerAction: 'all',
    store:new Ext.data.JsonStore({
        url : '/get_temp_user',
        root : 'data',
        totalProperty:'total',
	    idProperty:'id',
	    fields: [
	            {name: 'id',mapping:'id'},
	            {name:'email',mapping:'email'},
                {name:'first_name',mapping:'first_name'},
                {name:'last_name',mapping:'last_name'}
	        ]
    }),
    ref:'form_user_id',
    valueField:'id',
    displayField:'email',
    tpl:'<tpl for="."><div ext:qtip="{email}" class="x-combo-list-item">{first_name}.{last_name} [{email}]</div></tpl>',
    loadingText:'Loading...',
    listeners:{
        scope:this,
        select:function(field,rec,selIndex){
            
        }
    }
});



var nurse_management_config = {
    title : 'Nurse Management',
    id:'tab_nurse_management',
    closable:true,
    xtype:'grid',
    store : nurse_store,
    colModel:new Ext.grid.ColumnModel({
        defaultSortable:false,
        columns:[
            {header:'Name',dataIndex:'name',width: 300},
            {header:'Clinic',dataIndex:'clinic',width: 300}
        ]
    }),
    sm:new Ext.grid.RowSelectionModel({
	    singleSelect:true,
	    listeners:{
	        rowselect:function(sm,index,record){
	            var main_tabs = Ext.getCmp("main_tabs");
	            var sel = sm.getSelected();                
	            var t = main_tabs.findById('tab_nurse_'+sel.data.id);
	            if(t){
	                main_tabs.setActiveTab(t);
	            }else{ 
	                var new_tab = main_tabs.add({
	                   title :sel.data.name,
	                   id:'tab_nurse_'+sel.data.id,
	                   xtype:'form',
	                   closable:true,
	                   items:[{
	                       xtype : 'hidden',
	                       name : 'id',
	                       value: sel.data.id,
	                       ref:'form_id'
	                   },
	                   clinic_combo,
	                   user_combo,
	                   {
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
	                                url:'/update_nurse',
	                                params:{
	                                    type : 'NurseProfile',
	                                    id:f.form_id.getValue(),
	                                    user_id: f.form_clinic_id.getValue(),
	                                    clinic_id: f.form_user_id.getValue(),
	                                    desc: f.form_desc.getValue()
	                                },
	                                success:function(result, request){
	                                    try{
	                                        var r = Ext.util.JSON.decode(result.responseText);
	                                        if(r.success){
	                                            var main_tabs = Ext.getCmp("main_tabs");
	                                            var nurse_tab = Ext.getCmp("tab_nurse_management");
	                                            nurse_tab.getSelectionModel().clearSelections();
	                                            main_tabs.remove(f,true);
	                                            nurse_tab.store.reload();
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
	                });
                    new_tab.show();
//                    new_tab.form_clinic_id.setValue(sel.data.cid);
//                    new_tab.form_user_id.setValue(sel.data.uid);
//                    new_tab.doLayout();
	            }
	        }
	    }
	}),
    bbar:new Ext.PagingToolbar({
        pageSize : 10,
        store:nurse_store,
        displayMsg: 'Displaying nurse info {0} - {1} of {2}',
        displayInfo: true,
        emptyMsg: "No nurse to display"
    }),
    tbar: new Ext.Toolbar({
        items:['->',{
            text:'Add Nurse',
            handler:function(btn){
                var main_tabs = this.findParentByType('tabpanel');
                var tab_new_nurse = main_tabs.findById("tab_new_nurse");
                if(tab_new_nurse){
                    main_tabs.setActiveTab(tab_new_nurse);
                }else{
                    main_tabs.add({
                        title : 'New nurse',
                        id:'tab_new_nurse',
                        xtype:'form',
                        closable:true,
                        items:[clinic_combo,
                               user_combo,
                        {
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
                                var f = this.findParentByType('form');
                                Ext.Ajax.request({
                                    url:'/new_nurse',
                                    params:{
                                        type : 'NurseProfile',
                                        user_id: f.form_clinic_id.getValue(),
                                        clinic_id: f.form_user_id.getValue(),
                                        desc: f.form_desc.getValue()
                                    },
                                    success:function(result, request){
//                                        try{
                                            var r = Ext.util.JSON.decode(result.responseText);
                                            if(r.success){
                                                var main_tabs = Ext.getCmp("main_tabs");
                                                var tab_nurse_management = Ext.getCmp("tab_nurse_management");
                                                tab_nurse_management.getSelectionModel().clearSelections();
                                                main_tabs.remove(f,true);
                                                tab_nurse_management.store.reload();
                                            }
                                            Ext.Msg.alert(r.message)   
//                                        }catch (err){
//                                            Ext.Msg.alert("Can't decode the result from the server !");                                            
//                                        }
                                    },
                                    failure:function(result, request){
                                        Ext.Msg.alert('Error','Unable to save the record!')
                                    }
                                });
                            }
                        },{
                            text:"Cancel",
                            handler:function(btn){
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
        },{
            text:'Delete Nurse',
            handler:function(btn){
                var t = this.findParentByType('grid');
                var sm = t.getSelectionModel();
                var sel = sm.getSelected();
                if(sm.hasSelection()){
                    Ext.Msg.show({
                        title : 'Delete Nurse?',
                        buttons:Ext.MessageBox.YESNOCANCEL,
                        msg:'Remove the nurse ['+sel.data.name+'] ?',
                        fn:function(b){
                            Ext.Ajax.request({
                                url:'/delete_object',
                                params:{
                                    type:'NurseProfile',
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