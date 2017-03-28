module.exports = function (app) {

    var api = app.api.project;

    app.route('/v1/projects')
        .get(api.list)
        .post(api.add);

    app.route('/v1/projects/:id')
        .get(api.findById)
        .delete(api.removeById)
        .put(api.update);

    app.post('/upload', api.uploadFile);
    // app.get('/v1/projects', api.listProjects);
    // app.get('/v1/projects/:projectId', api.listByProject);

}