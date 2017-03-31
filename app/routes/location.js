module.exports = function (app) {

    var api = app.api.location;

    app.post('/v1/locations/:fileName', api.createLocations);    
    app.get('/v1/locations', api.list);
}