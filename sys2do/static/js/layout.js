var msg_data = [
                   [1,'test 1','2011-04-01'],
                   [1,'test 2','2011-04-01'],
                   [1,'test 3','2011-04-01'],
                   [1,'test 4','2011-04-01']
               ];
               
var msg_store = new Ext.data.Store({
                                    data:msg_data,
                                    reader:new Ext.data.ArrayReader({id:'id'},['id','content',{name:'time',type:'date',dateFormat:'Y-m-d'}])
                                  });
                                  




//main content tabs begin
                                  
var main_tabs = new Ext.TabPanel({
    region:'center',
    xtype:'tabpanel',
    id:'main_tabs',
    activeTab:0,
    margins:'0 0 0 0',
    items:[{
            title:'Welcome',
            contentEl:'welcome-tab'
        }]
})

var index = 0;
function addTab(id,title){
    var tab = main_tabs.findById(id);
    if(tab){
        main_tabs.setActiveTab(tab);
    }else{  
        main_tabs.add({
            title: title,
            iconCls: 'tabs',
            id:id,
            html: 'Tab Body ' + (index) + '<br/><br/>',
            closable:true
        }).show();
    }
}

function addGMapTab(){
    var gmap_tab = main_tabs.findById("gmap_tab");
    if(gmap_tab){
        main_tabs.setActiveTab(gmap_tab);
    }else{
        main_tabs.add(gmap_config).show();
    }
}


function addCalendarTab(){
    var calendar_tab = main_tabs.findById("tab_calendar");
    if(calendar_tab){
        main_tabs.setActiveTab(calendar_tab);
    }else{
        main_tabs.add(cal_config).show();
    }
}


function addClinicManagementTab(){
    var clinic_management_tab = main_tabs.findById("tab_clinic_management");
    if(clinic_management_tab){
        main_tabs.setActiveTab(clinic_management_tab);
    }else{
        var t = main_tabs.add(clinic_management_config);
        t.getBottomToolbar().store.load();
        t.show();
    }
}

function addDoctorManagementTab(){
    var doctor_management_tab = main_tabs.findById("tab_doctor_management");
    if(doctor_management_tab){
        main_tabs.setActiveTab(doctor_management_tab);
    }else{
        var t = main_tabs.add(doctor_management_config)
        t.getBottomToolbar().store.load();
        t.show();
    }
}


function addNurseManagementTab(){
    var nurse_management_tab = main_tabs.findById("tab_nurse_management");
    if(nurse_management_tab){
        main_tabs.setActiveTab(nurse_management_tab);
    }else{
        var t = main_tabs.add(nurse_management_config)
        t.getBottomToolbar().store.load();
        t.show();
//        t.doLayout();
    }
}

function addUserManagementTab(){
    var user_management_tab = main_tabs.findById("tab_user_management");
    if(user_management_tab){
        main_tabs.setActiveTab(user_management_tab);
    }else{
        var t = main_tabs.add(user_management_config)
        t.getBottomToolbar().store.load();
        t.show();
//        t.doLayout();
    }
}
                                  
//main content tabs end                                  










var north_tab_config = {
				           region:'north',
				           //html:'<p style="text-align:right">Welcome , CL</p>',
				           contentEl:'header-div',
				           margins:'5 5 5 5'
				       };


var south_tab_config = {
				            region:'south',
				            //split:true,
				            //html:'<p style="text-align:right">Powdered By Sys2do</p>',
				            contentEl:'footer-div',
				            margins:'5 5 5 5'
				        };


var west_tab_config = {
				           region:'west',
				           split:true,
				           collapsible:true,
				           collapseMode:'mini',
				           title:'Some Info',
				           width:200,
				           minSize:200,
				           margins:'0 0 0 5',
				           xtype:'treepanel',
				           useArrows: true,
				           autoScroll: true,
				           animate: true,
				           containerScroll: true,
				           border: false,
				           loader:new Ext.tree.TreeLoader(),
				           root:new Ext.tree.AsyncTreeNode({
				               expanded:true,
				               text:'Easy Book',
				               children:[{
				                   text:'Check My Booking',
				                   leaf:true,
				                   id:'bn_check_booking'
				               },{
				                   text:'Check And Book',
				                   leaf:true,
				                   id:'bn_go_booking'
				               },{
				                   text:'Open Calender',
				                   leaf:true,
				                   id:'bn_open_calendar'
				                   
				               },{
                                   text:'Clinic Management',
                                   leaf:true,
                                   id:'bn_clinic_management'
                                   
                               },{
                                   text:'Doctor Management',
                                   leaf:true,
                                   id:'bn_doctor_management'
                                   
                               },{
                                   text:'Nurse Management',
                                   leaf:true,
                                   id:'bn_nurse_management'
                                   
                               },{
                                   text:'User Management',
                                   leaf:true,
                                   id:'bn_user_management'
                                   
                               }]
				           }),
				           rootVisiable:false,
				           listeners: {
				                click: function(node) {
				                    //Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
				                    //addTab();
				                    if(node.id=='bn_check_booking'){
				                        addTab('tab_check_booking','Check Booking');
				                    }else if(node.id=='bn_go_booking'){
				                        addGMapTab();
				                    }else if(node.id=='bn_open_calendar'){
				                        addCalendarTab();
				                    }else if(node.id=='bn_clinic_management'){
                                        addClinicManagementTab();
                                    }else if(node.id=='bn_doctor_management'){
                                        addDoctorManagementTab();
                                    }else if(node.id=='bn_nurse_management'){
                                        addNurseManagementTab();
                                    }else if(node.id=='bn_user_management'){
                                        addUserManagementTab();
                                    }
				                        
				                }
				            }
				       };


var east_tab_config = {
			            region:'east',
			            split:true,
			            collapsible:true,
			            collapseMode:'mini',
			            width: 177,
			            //minSize:300,
			            margins:'0 5 0 0',
			            xtype:'container',
			            layout:'vbox',
			            align:'stretch',
			            items:[
			            //calendar panel                
			            {
			              xtype:'datepicker',
			              cls: 'ext-cal-nav-picker'
			            },
			            //message panel
			            {
			                xtype:'grid',
			                title:'Message',
			                autoHeight:true,
			                //anchor:'100%',
			                store:msg_store,
			                colModel:new Ext.grid.ColumnModel({
			                    columns:[
			                            {header:'Content',dataIndex:'content',width:170}
			                            //{header:'Time',dataIndex:'time',xtype:'datecolumn',format:'Y-M-d',width:90}
			                    ]
			                }),
			                bbar:new Ext.PagingToolbar({
			                    pageSize : 2,
			                    store:msg_store
			                })
			            }]
			            
			        };


                
                    
                    

Ext.onReady(function(){
    //main layout start
    var viewport = new Ext.Viewport({
       layout:'border',
       defaults:{
        bodyStyle:'padding:5px'
       },
       items:[
       //the north part
       north_tab_config,
       //the west part 
       west_tab_config,
       //the east part 
       east_tab_config,
       //the south part
       south_tab_config,
       //the center
       main_tabs
        ]
    }); 
    //main layout end
})