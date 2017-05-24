module.exports = function (app) {

    var api = app.api.rule;

    app.route('/v1/rules')
        .get(api.list)
        .post(api.add);

    app.route('/v1/rules/:id')
        .get(api.findByID)
        .delete(api.removeByID)
        .put(api.update);

    app.delete('/v1/rules/byProject/:id', api.removeByProjectName);

    //tests
    app.get('/user', function (req, res) {
        res.status(200).json({ name: 'tobi' });
    });


    /**
     * //local DB routes configuration
     */
    var api2 = app.api.v2.rule;

    app.route('/v2/rules')
        .get(api2.list)
        .post(api2.add);

    app.route('/v2/rules/:id')
        .get(api2.findByID)
        .delete(api2.removeByID)
        .put(api2.update);

};