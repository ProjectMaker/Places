/**
 * Created by thomasmichelet on 18/11/15.
 */
var urlPlaces = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + SHOP_NAME + "+in+75020+fr&key=AIzaSyA0qnr1idp3j54G8aaEisZo4ioXoOQPqcA&sensor=false";
function getPlaces(cb, cbErr, urlApi) {
    HTTP.get(urlApi, function(err, result) {
        if ( err ) cbErr(err);
        else cb(result.data);
    });
}

function onApiError(e) {
    console.log(e);
}

function onApiEnd(data) {
    data['results'].forEach( function(result) {
        var place = {shop: SHOP_NAME, address: result['formatted_address'], lat: result['geometry']['location']['lat'], lng: result['geometry']['location']['lng']};
        Places.insert(place);
    });


    if ( data['next_page_token'] ) {
        getPlaces(onApiEnd, onApiEnd, urlPlaces + '&pagetoken=' + data['next_page_token']);
    }
}

Meteor.startup(function () {
    if (Places.find().count() === 0) {
        getPlaces(onApiEnd, onApiEnd, urlPlaces);
    }
});
