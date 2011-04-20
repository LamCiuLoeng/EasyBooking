/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/**
 * @class Ext.ux.GMapPanel
 * @extends Ext.Panel
 * @author Shea Frederick
 */
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
       
       /*
       google.maps.event.addListener(this.gmap, 'click',function(event) {
           var gmap_tab = Ext.getCmp("gmap_tab");       
	       for(i in gmap_tab.gpmarkers){
	           gmap_tab.addMarker(gmap_tab.gpmarkers[i].lat,gmap_tab.gpmarkers[i].lng,gmap_tab.gpmarkers[i].title);        
	       }
	  });
      */
      
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
    
//    onMapReady : function(){
//        Ext.Msg.alert("kkk");
//        this.addMarkers(this.markers);
//        this.addMapControls();
//        this.addOptions();  
//    },
    
    
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
    
    /*
    addMarkers : function(markers) {
        
        if (Ext.isArray(markers)){
            for (var i = 0; i < markers.length; i++) {
                var mkr_point = new GLatLng(markers[i].lat,markers[i].lng);
                this.addMarker(mkr_point,markers[i].marker,false,markers[i].setCenter, markers[i].listeners);
            }
        }
        
    },
    
    addMarker : function(point, marker, clear, center, listeners){
        
        //Ext.applyIf(marker,G_DEFAULT_ICON);

        if (clear === true){
            this.getMap().clearOverlays();
        }
        if (center === true) {
            this.getMap().setCenter(point, this.zoomLevel);
        }

        //var mark = new GMarker(point,marker);
        var mark = new google.maps.Marker(point,marker);
        if (typeof listeners === 'object'){
            for (evt in listeners) {
                GEvent.bind(mark, evt, this, listeners[evt]);
            }
        }
        //this.getMap().addOverlay(mark);
        mark.setMap(this.getMap());
    },
    */
    
    addMapControls : function(){
        
        if (this.gmapType === 'map') {
            if (Ext.isArray(this.mapControls)) {
                for(i=0;i<this.mapControls.length;i++){
                    this.addMapControl(this.mapControls[i]);
                }
            }else if(typeof this.mapControls === 'string'){
                this.addMapControl(this.mapControls);
            }else if(typeof this.mapControls === 'object'){
                this.getMap().addControl(this.mapControls);
            }
        }
        
    },
    addMapControl : function(mc){
        
        var mcf = window[mc];
        if (typeof mcf === 'function') {
            this.getMap().addControl(new mcf());
        }    
        
    },
    addOptions : function(){
        
        if (Ext.isArray(this.mapConfOpts)) {
            var mc;
            for(i=0;i<this.mapConfOpts.length;i++){
                this.addOption(this.mapConfOpts[i]);
            }
        }else if(typeof this.mapConfOpts === 'string'){
            this.addOption(this.mapConfOpts);
        }        
        
    },
    addOption : function(mc){
        
        var mcf = this.getMap()[mc];
        if (typeof mcf === 'function') {
            this.getMap()[mc]();
        }    
        
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
        
        
        
        /*
        alert(response);
        if (!response || response.status != "OK") {
            Ext.MessageBox.alert('Error', 'Code '+response.status+' Error Returned');
        }else{
            place = response.Placemark[0];
            addressinfo = place.AddressDetails;
            accuracy = addressinfo.Accuracy;
            if (accuracy === 0) {
                Ext.MessageBox.alert('Unable to Locate Address', 'Unable to Locate the Address you provided');
            }else{
                if (accuracy < 7) {
                    Ext.MessageBox.alert('Address Accuracy', 'The address provided has a low accuracy.<br><br>Level '+accuracy+' Accuracy (8 = Exact Match, 1 = Vague Match)');
                }else{
                    point = new GLatLng(place.Point.coordinates[1], place.Point.coordinates[0]);
                    if (typeof this.setCenter.marker === 'object' && typeof point === 'object'){
                        this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true, this.setCenter.listeners);
                    }
                }
            }
        }
        */
        
    }
 
});

Ext.reg('gmappanel', Ext.ux.GMapPanel); 