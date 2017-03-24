var path = require('path');
var formidable = require('formidable');
var fs = require('fs')

module.exports = function (app) {

    var api = app.api.project;

    app.post('/api/fileUpload', function (req, res) {
        // create an incoming form object
        var form = new formidable.IncomingForm();

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function (field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
            console.log('PATH', file.path);
            console.log('PATH', file);
        });

        // log any errors that occur
        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function () {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);        
    })


    app.route('/v1/projects')
        .get(api.list)
        .post(api.add);

    app.route('/v1/projects/:id')
        .get(api.findById)
        .delete(api.removeById)
        .put(api.update);

    // app.get('/v1/projects', api.listProjects);
    // app.get('/v1/projects/:projectId', api.listByProject);

}