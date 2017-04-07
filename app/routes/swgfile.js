module.exports = function (app) {

    var api = app.api.swgfile;

    app.post('/v1/swgfile/upload', api.uploadFile);
    app.post('/v1/swgfile/process/:filename', api.processFile);
};