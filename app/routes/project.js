module.exports = function (app) {

    var api = app.api.project;

    app.route('/v1/projects')
        .get(api.list)
        .post(api.add);

    app.route('/v1/projects/:id')
        .get(api.findById)
        .delete(api.removeById)
        .put(api.update);

    /**
     * //local DB routes configuration
     */
    var api2 = app.api.v2.project;

    app.route('/v2/projects')
        .get(api2.list)
        .post(api2.add);

    app.route('/v2/projects/:id')
        .get(api2.findById)
        .delete(api2.removeById)
        .put(api2.update);
}