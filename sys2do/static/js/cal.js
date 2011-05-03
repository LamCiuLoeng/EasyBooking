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



//My try start
/*
DBEventStore = Ext.extend(Ext.data.Store,{
                                            constructor : function(config){
                                                config = Ext.applyIf(config || {}, {
									            storeId: 'eventStore',
									            root: 'evts',
                                                url:{
                                                    api:{
                                                        read: {url: '/event_read', method: 'GET'},
                                                        save: {url: '/event_save',method: 'GET'}
                                                    }
                                                },
									            writer: new Ext.data.JsonReader({writeAllFields:true}),
                                                autoSave:false,        
									            fields: Ext.ensible.cal.EventRecord.prototype.fields.getRange(),
									            idProperty: Ext.ensible.cal.EventMappings.EventId.mapping || 'id',
                                                listeners:{
                                                    exception:function(proxy,type,action,o,result,records){
                                                        if(type=='remote'){
                                                            Ext.Msg.alert("Could not "+action,result.raw.message);
                                                        }else if(type='response'){
                                                            Ext.Msg.alert("Could not "+action,"Server's response could not be decoded");
                                                        }else{
                                                            Ext.Msg.alert("Store sync fails","Unknown error");
                                                        }
                                                    }
                                                }
									        });
									        this.reader = new Ext.data.JsonReader(config);
									        DBEventStore.superclass.constructor.call(this, config);
                                            }
                                         })
*/


var calendarStore = new Ext.data.JsonStore({
        storeId: 'calendarStore',
        url: '/calendars.json',
        //url:'/static/aa.json',
        root: 'calendars',
        idProperty: Ext.ensible.cal.CalendarMappings.CalendarId.mapping || 'id',
        fields: Ext.ensible.cal.CalendarRecord.prototype.fields.getRange(),
        remoteSort: true,
        sortInfo: {
            field: Ext.ensible.cal.CalendarMappings.Title.name,
            direction: 'ASC'
        }
    });
    // Make sure this loads first so that the calendar records are available
    // when the event store loads and triggers the view to render
    calendarStore.load();

    
var crud_url = "/calendars_event?action=";

var proxy = new Ext.data.HttpProxy({
        disableCaching: false, // no need for cache busting when loading via Ajax
        api: {
            read: crud_url+"r",
            update: crud_url+"u",
            create:crud_url+"n",
            destroy:{url:crud_url+"d",method:'post'}
        },
        listeners: {
            /*
            exception: function(proxy, type, action, o, res, arg){
                var msg = res.message ? res.message : Ext.decode(res.responseText).message;
                // ideally an app would provide a less intrusive message display
                Ext.Msg.alert('Server Error', msg);
            }
            */
            exception:function(proxy,type,action,o,result,records){
                if(type='remote'){
                    Ext.Msg.alert("Could not "+action,result);
                }else if(type='response'){
                    
                    Ext.Msg.alert("Could not "+action,"Server's response could not be decoded. " + result);
                }else{
                    Ext.Msg.alert("Store sync fails","Unknown error");
                }
            }
        }
    }); 
    
   
                                         
var store = new Ext.ensible.cal.EventStore({
        id: 'event-store',
        restful: true,
        proxy: proxy,
        reader: new Ext.data.JsonReader({
	        totalProperty: 'total',
	        successProperty: 'success',
	        idProperty: 'id',
	        root: 'data',
	        messageProperty: 'message',
	        fields: Ext.ensible.cal.EventRecord.prototype.fields.getRange()
	    }),
        writer: new Ext.data.JsonWriter({
            writeAllFields:true,
            encode: true
        }),
        // the view will automatically set start / end date params for you. You can
        // also pass a valid config object as specified by Ext.data.Store.load()
        // and the start / end params will be appended to it.
        autoLoad: true,
        
        // It's easy to provide generic CRUD messaging without having to handle events on every individual view.
        // Note that while the store provides individual add, update and remove events, those fire BEFORE the
        // remote transaction returns from the server -- they only signify that records were added to the store,
        // NOT that your changes were actually persisted correctly in the back end. The 'write' event is the best
        // option for generically messaging after CRUD persistance has succeeded.
        listeners: {
            'write': function(store, action, data, resp, rec){
                switch(action){
                    case 'create': 
                        //Ext.ensible.sample.msg('Add', 'Added "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        Ext.Msg.alert("Add "+Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name]));
                        break;
                    case 'update':
                        //Ext.ensible.sample.msg('Update', 'Updated "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                    case 'destroy':
                        //Ext.ensible.sample.msg('Delete', 'Deleted "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                }
            }
        }
    });
                                         


//my try end



//Calendar config for the tab panel
var cal_config = {
	            title: 'Booking Calendar',
	            iconCls: 'tabs',
	            id:'tab_calendar',
	            closable:true,
	            border: false,
	            xtype: 'extensible.calendarpanel',
	            //autoLoad: true,
	            eventStore: store,
                calendarStore: calendarStore,
                showDayView: false,
                showMultiDayView: false,
                showMultiWeekView:false,
                weekViewCfg:{
                    viewStartHour: 9,
                    viewEndHour: 18,
                    ddIncrement:30
                },
                /*
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
                */
	            initComponent: function() {
	                //App.calendarPanel = this;
	                this.constructor.prototype.initComponent.apply(this);
	            },
	            listeners:{
	                'eventadd':{
	                    fn: function(cp, rec){
	                        //this.eventStore.add(rec);
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
	        };