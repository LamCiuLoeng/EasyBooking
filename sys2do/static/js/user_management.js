var user_store = new Ext.data.JsonStore({
    url : '/get_user_data',
    root : 'data',
    totalProperty:'total',
    idProperty:'id',
    remoteSort: true,
    fields: [
            'id',
	        'image',
	        'email',
	        'phone',
            'first_name',
            'last_name'
        ]
});

var user_management_config = {
    title: 'User Management',
    id:'tab_user_management',
    closable:true,
    xtype:'grid',
    store : user_store,
    colModel:new Ext.grid.ColumnModel({
        defaultSortable:false,
        columns:[
            {header:'Email',dataIndex:'email'},
            {header:'Name',dataIndex:'first_name',renderer:function(v,x,r){ return v + " " + r.get('last_name'); }},
            {header:'Phone',dataIndex:'phone'}
        ]
    }),
    //view:new Ext.grid.GroupingView(),
    sm:new Ext.grid.RowSelectionModel({
        singleSelect:true,
        listeners:{
            rowselect:function(sm,index,record){
                
            }
        }
    }),
    bbar:new Ext.PagingToolbar({
        pageSize : 3,
        store:user_store,
        displayMsg: 'Displaying user info {0} - {1} of {2}',
        displayInfo: true,
        emptyMsg: "No user to display"
    }),
    tbar:new Ext.Toolbar({
        items:[{
            text:'Add User',
            cls:'x-btn-text-icon',
            handler:function(){
                //Ext.Msg.alert("kkk")
            }
        },{
            text:'Delete User',
            handler:function(){
                var grid = Ext.getCmp("tab_user_management");
                var sm = Ext.getCmp("tab_user_management").getSelectionModel();
                var sel = sm.getSelected();
                if(sm.hasSelection()){
                    Ext.Msg.show({
                        title : 'Delete User',
                        buttons:Ext.MessageBox.YESNOCANCEL,
                        msg:'Remove '+sel.data.email+' ?',
                        fn:function(btn){
                            if(btn == 'yes'){
                                Ext.Ajax.request({
                                    url:'/delete_object',
                                    params:{
                                        type : 'User',
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
                }
            }
        }]
    })
}
