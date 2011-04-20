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
                                  

var today = new Date().clearTime();
Ext.ensible.sample.EventData = {
    "evts":[{
        "id":1001,
        "cid":1,
        "title":"Vacation",
        "start":today.add(Date.DAY, -20).add(Date.HOUR, 10),
        "end":today.add(Date.DAY, -10).add(Date.HOUR, 15),
        "notes":"Have fun"
    },{
        "id":1002,
        "cid":2,
        "title":"Lunch with Matt",
        "start":today.add(Date.HOUR, 11).add(Date.MINUTE, 30),
        "end":today.add(Date.HOUR, 13),
        "loc":"Chuy's!",
        "url":"http://chuys.com",
        "notes":"Order the queso",
        "rem":"15"
    },{
        "id":1003,
        "cid":3,
        "title":"Project due",
        "start":today.add(Date.HOUR, 15),
        "end":today.add(Date.HOUR, 15)
    },{
        "id":1004,
        "cid":1,
        "title":"Sarah's birthday",
        "start":today,
        "end":today,
        "notes":"Need to get a gift",
        "ad":true
    },{
        "id":1005,
        "cid":2,
        "title":"A long one...",
        "start":today.add(Date.DAY, -12),
        "end":today.add(Date.DAY, 10).add(Date.SECOND, -1),
        "ad":true
    },{
        "id":1006,
        "cid":3,
        "title":"School holiday",
        "start":today.add(Date.DAY, 5),
        "end":today.add(Date.DAY, 7).add(Date.SECOND, -1),
        "ad":true,
        "rem":"2880"
    },{
        "id":1007,
        "cid":1,
        "title":"Haircut",
        "start":today.add(Date.HOUR, 9),
        "end":today.add(Date.HOUR, 9).add(Date.MINUTE, 30),
        "notes":"Get cash on the way"
    },{
        "id":1008,
        "cid":3,
        "title":"An old event",
        "start":today.add(Date.DAY, -30),
        "end":today.add(Date.DAY, -28),
        "ad":true
    },{
        "id":1009,
        "cid":2,
        "title":"Board meeting",
        "start":today.add(Date.DAY, -2).add(Date.HOUR, 13),
        "end":today.add(Date.DAY, -2).add(Date.HOUR, 18),
        "loc":"ABC Inc.",
        "rem":"60"
    },{
        "id":1010,
        "cid":3,
        "title":"Jenny's final exams",
        "start":today.add(Date.DAY, -2),
        "end":today.add(Date.DAY, 3).add(Date.SECOND, -1),
        "ad":true
    },{
        "id":1011,
        "cid":1,
        "title":"Movie night",
        "start":today.add(Date.DAY, 2).add(Date.HOUR, 19),
        "end":today.add(Date.DAY, 2).add(Date.HOUR, 23),
        "notes":"Don't forget the tickets!",
        "rem":"60"
    },{
        "id":1012,
        "cid":4,
        "title":"Gina's basketball tournament",
        "start":today.add(Date.DAY, 8).add(Date.HOUR, 8),
        "end":today.add(Date.DAY, 10).add(Date.HOUR, 17)
    },{
        "id":1013,
        "cid":4,
        "title":"Toby's soccer game",
        "start":today.add(Date.DAY, 5).add(Date.HOUR, 10),
        "end":today.add(Date.DAY, 5).add(Date.HOUR, 12)
    }]
};
var eventStore = new Ext.ensible.sample.MemoryEventStore({
    // defined in data/events.js
    data: Ext.ensible.sample.EventData
});


//main content tabs begin
                                  
var main_tabs = new Ext.TabPanel({
    region:'center',
    activeTab:0,
    margins:'0 0 0 0',
    items:[{
            title:'Welcome',
            contentEl:'welcome-tab'
        }]
})

var index = 0;
function addTab(id){
    var tab = main_tabs.findById(id);
    if(tab){
        main_tabs.setActiveTab(tab);
    }else{  
        main_tabs.add({
            title: 'New Tab ' + (++index),
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
        main_tabs.add({
            title: 'Clinic Location Map',
            iconCls: 'tabs',
            id:'gmap_tab',
            closable:true,
            xtype: 'gmappanel',
//            tbar:{
//                items:[{
//                    text:'Search'
//                }]  
//            },
            gpmarkers: [
            {
                lat: 22.396428,
                lng: 114.1094970,
                title: 'C2',
                listeners:{
                    click:function(event){
                        var gmap_tab = main_tabs.findById("gmap_tab");                        
                        var marker = this;
                        gmap_tab.infowindow.setContent("<a href='#' onclick='addTab(\"aa\")'>See the Doctors in the Clinic</a>");
                        //marker.setAnimation(google.maps.Animation.BOUNCE);
                        gmap_tab.infowindow.open(gmap_tab.gmap,marker);
                        //google.maps.event.addListenerOnce(gmap_tab.infowindow,'closeclick',function(){marker.setAnimation(null);})
                    }
                }
            },
            {
                lat: 22.396428,
                lng: 114.0094970,
                title: 'C1',
                listeners:{
                    click:function(event){
                        var gmap_tab = main_tabs.findById("gmap_tab");                        
                        var marker = this;
                        gmap_tab.infowindow.setContent("Hello"+marker.title);
                        //marker.setAnimation(google.maps.Animation.BOUNCE);
                        gmap_tab.infowindow.open(gmap_tab.gmap,marker);
                        //google.maps.event.addListenerOnce(gmap_tab.infowindow,'closeclick',function(){marker.setAnimation(null);})
                    }
                }
            },
            {
                lat: 22.296428,
                lng: 114.0094970,
                title: 'C3',
                listeners:{
                    click:function(event){
                        var gmap_tab = main_tabs.findById("gmap_tab");                        
                        var marker = this;
                        gmap_tab.infowindow.setContent("Hello"+marker.title);
                        //marker.setAnimation(google.maps.Animation.BOUNCE);
                        gmap_tab.infowindow.open(gmap_tab.gmap,marker);
                        //google.maps.event.addListenerOnce(gmap_tab.infowindow,'closeclick',function(){marker.setAnimation(null);})
                    }
                }
            }]
        }).show();
    }
}


function addCalendarTab(){
    var calendar_tab = main_tabs.findById("tab_calendar");
    if(calendar_tab){
        main_tabs.setActiveTab(calendar_tab);
    }else{
        main_tabs.add({
            title: 'Booking Calendar',
            iconCls: 'tabs',
            id:'tab_calendar',
            closable:true,
            border: false,
            xtype: 'extensible.calendarpanel',
            activeItem: 1,
            eventStore: eventStore,
            viewConfig:{
                
            },
            monthViewCfg: {
                showHeader: true,
                showWeekLinks: true,
                showWeekNumbers: true
            },
            multiWeekViewCfg: {
                weekCount: 1
            },
            initComponent: function() {
                //App.calendarPanel = this;
                this.constructor.prototype.initComponent.apply(this);
            },
            listeners:{
                'eventadd':{
                    fn: function(cp, rec){
                        Ext.Msg.alert("aaa");
                    },
                    scope: this
                },
                'eventcancel': {
                    fn: function(cp, rec){
                        // edit canceled
                    },
                    scope: this
                },
                'rangeselect': {
                    fn: function(vw, dates, onComplete){
                        
                    },
                    scope: this
                }
            }
        }).show();
    }
}
                                  
//main content tabs end                                  



Ext.onReady(function(){
    //main layout start
    var viewport = new Ext.Viewport({
       layout:'border',
       defaults:{
        bodyStyle:'padding:5px'
       },
       items:[
       //the north part
       {
           region:'north',
           //html:'<p style="text-align:right">Welcome , CL</p>',
           contentEl:'header-div',
           margins:'5 5 5 5'
       },
       //the west part 
       {
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
                   
               }]
           }),
           rootVisiable:false,
           listeners: {
	            click: function(node) {
	                //Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
                    //addTab();
                    if(node.id=='bn_check_booking'){
                        addTab('tab_check_booking');
                    }else if(node.id=='bn_go_booking'){
	                    addGMapTab();
                    }else if(node.id=='bn_open_calendar'){
                        addCalendarTab();
                    }
                        
	            }
	        }
       },
       //the east part 
       {
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
            
        },
        //the south part
        {
            region:'south',
            //split:true,
            //html:'<p style="text-align:right">Powdered By Sys2do</p>',
            contentEl:'footer-div',
            margins:'5 5 5 5'
        },
        //the center
        /*
        {
            region:'center',
            xtype:'tabpanel',
            activeTab:0,
            items:[{
                title:'Welcome',
                contentEl:'welcome-tab'
            }],
            //html:'Center',
            margins:'0 0 0 0'
        }
        */
        main_tabs
        ]
    }); 
    //main layout end
})