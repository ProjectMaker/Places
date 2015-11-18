/**
 * Created by thomasmichelet on 17/11/15.
 */
Template.app.helpers({
    showLink: function() {
        return Baskets.find().count() ? true : false;
    },
    shopName: function() {
        return SHOP_NAME;
    },
    placeIds: function() {
        var ids = [];
        Baskets.find().forEach( function(place) {
            ids.push(place._id.valueOf());
        });

        return ids.join(',');
    }
})