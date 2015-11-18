/**
 * Created by thomasmichelet on 18/11/15.
 */
markers = {};

Meteor.subscribe('places');

Meteor.startup(function() {
    GoogleMaps.load();
});

