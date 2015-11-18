/**
 * Created by thomasmichelet on 16/11/15.
 */
Router.route('/', function () {
    this.wait(Meteor.subscribe('places'));
    if ( this.ready() ) this.render('app');
    else this.render('loading');
});

Router.route('/csv/:ids', {
    where: 'server',
    action: function () {
        var filename = 'pixmania.csv';
        var fileData = "";

        var headers = {
            'Content-type': 'text/csv',
            'Content-Disposition': "attachment; filename=" + filename
        };
        var _ids = this.params.ids.split(',');

        var places = Places.find({_id: { $in: _ids}});
        places.forEach(function(place) {
            console.log(place.address);
            fileData += SHOP_NAME + ";" + place.address + "\r\n";
        });
        this.response.writeHead(200, headers);

        return this.response.end(fileData);
    }
});
