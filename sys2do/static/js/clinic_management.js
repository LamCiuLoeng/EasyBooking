//var clinic = Ext.data.Record.create([
//    'id',
//    'image',
//    'name',
//    'location',
//    'address',
//    'desc'
//]);


//var clinic_store = {
//    url : '/get_clinic_data',
//    reader: new Ext.data.JsonReader({
//        root : 'data',
//        totalProperty:'total',
//        idProperty:'id'
//    },Ext.data.Record.create([
//	    'id',
//	    'image',
//	    'name',
//	    'location',
//	    'address',
//	    'desc'
//	]))
//}


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
            {header:'Clinic',dataIndex:'name'},
            {header:'Address',dataIndex:'address'}
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
        store:clinic_store,
        displayMsg: 'Displaying clinic info {0} - {1} of {2}',
        displayInfo: true,
        emptyMsg: "No clinic to display"
    })
}
