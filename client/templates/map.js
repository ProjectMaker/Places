/**
 * Created by thomasmichelet on 17/11/15.
 */
Template.map.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            var boundsPlaces = new google.maps.LatLngBounds();
            Places.find().fetch().forEach(function(place) {
                var myLatlng = new google.maps.LatLng(place.lat, place.lng);
                boundsPlaces.extend(myLatlng);
            });
            return {
                center: boundsPlaces.getCenter(),
                zoom: 8,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
        }
    }
});

Template.map.onCreated( function() {
    GoogleMaps.ready('map', function(map) {
        var boundsPlaces = new google.maps.LatLngBounds();
        Places.find().fetch().forEach(function(place) {
            var myLatlng = new google.maps.LatLng(place.lat,place.lng);
            boundsPlaces.extend(myLatlng);
            var marker = new google.maps.Marker({ position: myLatlng,
                title:"Micromania",
                icon: new google.maps.MarkerImage(ICON_MARKER_NO_SELECTED),
                id: place._id});
            markers[place._id] = marker;
            marker.setMap(map.instance);
            google.maps.event.addListener(marker, 'click', function() {
                var place = Places.findOne(this.id);
                if ( place ) {
                    if ( Baskets.findOne(this.id) ) {
                        Baskets.remove(this.id);
                        markers[this.id].setIcon(ICON_MARKER_NO_SELECTED);
                    }
                    else {
                        Baskets.insert(place);
                        markers[this.id].setIcon(ICON_MARKER_SELECTED);
                    }
                }

            });
            //map.instance.setCenter(boundsPlaces.getCenter());
            map.instance.fitBounds(boundsPlaces);
        });
    });
});
