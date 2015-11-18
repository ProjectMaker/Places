/**
 * Created by thomasmichelet on 17/11/15.
 */
Template.basket.helpers({
    noPlace: function() {
        return Baskets.find().count() ? false : true;
    },
    places: function() {
        return Baskets.find();
    }
});

Template.basket.events({
    'click .btn': function(e) {
        e.preventDefault();
        Baskets.remove(this._id);
        markers[this._id].setIcon(ICON_MARKER_NO_SELECTED);
    }
});