var gpmarkers = [];
{% for d in data %}
    gpmarkers.push({
        lat : {{d['lat']}},
        lng : {{d['lng']}},
        title : '{{d['title']}}',
        listeners:{
            click:function(event){
                var gmap_tab = main_tabs.findById("gmap_tab");                        
                var marker = this;
                gmap_tab.infowindow.setContent("<a href='#' onclick='addTab(\"tab_clinc_\"+\"{{d['id']}}\",\"{{d['title']}}\")'>See the Doctors in the Clinic ["+"{{d['title']}}"+"]</a>");
                //marker.setAnimation(google.maps.Animation.BOUNCE);
                gmap_tab.infowindow.open(gmap_tab.gmap,marker);
                //google.maps.event.addListenerOnce(gmap_tab.infowindow,'closeclick',function(){marker.setAnimation(null);})
            }
        }
    })
{% endfor %}