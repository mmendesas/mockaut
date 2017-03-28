module.exports = function (app) {

    var api = app.api.rule;

    app.route('/v1/rules')
        .get(api.list)
        .post(api.add);

    app.route('/v1/rules/:id')
        .get(api.findByID)
        .delete(api.removeByID)
        .put(api.update);
};