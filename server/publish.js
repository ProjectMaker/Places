/**
 * Created by thomasmichelet on 18/11/15.
 */


Meteor.publish('places', function() {
    return Places.find({shop: SHOP_NAME});
});
