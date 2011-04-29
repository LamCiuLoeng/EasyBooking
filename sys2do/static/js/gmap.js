Ext.ux.GMapPanel = Ext.extend(Ext.Panel, {
    initComponent : function(){
        
        var defConfig = {
            plain: true,
            yaw: 180,
            pitch: 0,
            zoom: 12,
            gmapType: 'map',
            border: false,
            minZoom : 10,
            maxZoom : 18,
            center: new google.maps.LatLng(22.396428, 114.1094970),  //hong kong lat and lng
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gpmarkers : [],
            gpmarkersArray : []
        };
        
        Ext.applyIf(this,defConfig);
        Ext.ux.GMapPanel.superclass.initComponent.call(this); 

    },
    afterRender : function(){

        var wh = this.ownerCt.getSize();
        Ext.applyIf(this, wh);
        
        Ext.ux.GMapPanel.superclass.afterRender.call(this);    
        
        this.gmap =  new google.maps.Map(this.body.dom,
                                        {
                                            zoom : this.zoom,
                                            center: this.center,
                                            mapTypeId:this.mapTypeId,
                                            minZoom:this.minZoom,
                                            maxZoom:this.maxZoom
                                        });

      this.infowindow = new google.maps.InfoWindow();
                                               
       for(i in this.gpmarkers){
           this.addMarker(this.gpmarkers[i]);        
       }
    },
    
    addMarker:function(cnf){
      var tmpMarker = new google.maps.Marker({
        position: new google.maps.LatLng(cnf.lat,cnf.lng),
        title:cnf.title,
        map:this.gmap
      });
      
      for(i in cnf.listeners){
          google.maps.event.addListener(tmpMarker,i,cnf.listeners[i]);
      }
      
      this.gpmarkersArray.push(tmpMarker);
    },
    
    clearOverlays:function() {
      if (this.gpmarkersArray) {
        for (i in this.gpmarkersArray) {
          this.gpmarkersArray[i].setMap(null);
        }
      }
    },
    
    showOverlays:function() {
      if (this.gpmarkersArray) {
        for (i in this.gpmarkersArray) {
          this.gpmarkersArray[i].setMap(this.gmap);
        }
      }
    },
    
    deleteOverlays:function() {
      if (this.gpmarkersArray) {
        for (i in this.gpmarkersArray) {
          this.gpmarkersArray[i].setMap(null);
        }
        this.gpmarkersArray.length = 0;
      }
    },

    
    onResize : function(w, h){
        /*
        if (typeof this.getMap() == 'object') {
            this.gmap.checkResize();
        }
        */
        
        //google.maps.event.trigger(this.getMap(), 'resize');
        
        Ext.ux.GMapPanel.superclass.onResize.call(this, w, h);

    },
    setSize : function(width, height, animate){
        
        /*
        if (typeof this.getMap() == 'object') {
            this.gmap.checkResize();
        }
        */
        //google.maps.event.trigger(this.getMap(), 'resize');
        Ext.ux.GMapPanel.superclass.setSize.call(this, width, height, animate);
        
    },
    getMap : function(){
        
        return this.gmap;
        
    },
    getCenter : function(){
        
        return this.getMap().getCenter();
        
    },
    getCenterLatLng : function(){
        
        var ll = this.getCenter();
        return {lat: ll.lat(), lng: ll.lng()};
        
    },
    
    geoCodeLookup : function(addr) {
        
        this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({address:addr}, this.addAddressToMap.createDelegate(this));
        
    },
    addAddressToMap : function(response) {
        for(var i=0;i<response.length;i++){
            var r = response[i];
            //Ext.Msg.alert(r.geometry.location.lat());
            var location = r.geometry.location;
            this.addMarker(location,
                            this.setCenter.marker,this.setCenter.marker.clear,true, this.setCenter.listeners);
        }
        
    }
 
});

Ext.reg('gmappanel', Ext.ux.GMapPanel); 




function openClinicTab(cid){
    var main_tabs = Ext.getCmp("main_tabs");
    var tab_id = 'tab_clinic_' + cid;
    var t = main_tabs.findById(tab_id)
    if(t){
        main_tabs.setActiveTab(t);
    }else{
        Ext.Ajax.request({
            url:'/get_one_clinic',
            params:{
                id : cid
            },
            success:function(result, request){
                var r = Ext.util.JSON.decode(result.responseText);
                if(r.success){
                    var html = "<h2>"+r.clinic.name+"</h2>";
                    html += "<p>"+r.clinic.desc+"</p>";
                    
                    if(r.doctors.length>0){   
	                    html = "<div><ul>";
	                    for(var i=0;i< r.doctors.length;i++){
	                        html += "<li>";
	                        html += "<div><p><b>" + r.doctors[i].name + "</b><br />";
	                        html += r.doctors[i].desc + "</p></div>";
	                        html += "</li>"
	                    }
	                    html += "</ul></div>";
                    }
			        main_tabs.add({
			            title : r.clinic.name,
                        id : 'tab_clinic_' + cid,
                        xtype:'panel',
                        html: html,
                        closable:true
			        }).show();
                }else{
                    Ext.Msg.alert(r.message);
                }
            },
            failure:function(result, request){
                Ext.Msg.alert("Error");
            }
        })
        
    }
}





//gmap config for the tab panel
var gmap_session_config = {
	            title: 'Clinic Location Map',
	            iconCls: 'tabs',
	            id:'gmap_tab',
	            closable:true,
	            xtype: 'gmappanel',
	            gpmarkers: gpmarkers  //get it from the database
	        };
            
            
var gmap_config = {
    title: 'Clinic Location Map',
    iconCls: 'tabs',
    id:'gmap_tab',
    closable:true,
    layout:'border',
    items:[{
        region:'center',
        xtype: 'gmappanel',
        gpmarkers: gpmarkers  //get it from the database
    },{
        region:'north',
        height:27,
        xtype:'toolbar',
        items:['->',{
            xtype:'textfield',
            name:'q'
        },{
            text:'Search',
            xtype:'button',
            handler:function(btn){
                
            }
        }]
    },{
        region:'west',
        id:'kk',
        width:150,
//        html:'XXX',
        listeners:{
            afterRender :function(){
                Ext.ux.GMapPanel.superclass.afterRender.call(this);
                var p = this;
                Ext.Ajax.request({
                    url:'/get_all_clinic',
                    success:function(result, request){
                        try{
                            var r = Ext.util.JSON.decode(result.responseText);
                            if(r.success){
                                var h = "<ul>";
                                for(var i=0;i<r.data.length;i++){                                    
                                    h += "<div>";
                                    h += "<p><b>" + r.data[i].name + "</b><br />";
                                    h += "<input type='button' value='View Doctors' onclick='openClinicTab("+ r.data[i].id +")'/></p>"
                                    h += "</div>";
                                }
                                h += "</ul>";
                                p.update(h);
                            }
                            
                        }catch (err){
                            Ext.Msg.alert("Can't decode the result from the server !");  
                            throw err;
                        }
                    },
                    failure:function(result, request){
                        Ext.Msg.alert('Error','Unable to save the record!')
                    }
                });
            }
        }
    }]
}