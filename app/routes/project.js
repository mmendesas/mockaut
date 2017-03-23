var path = require('path');

module.exports = function (app) {

    var api = app.api.project;

    app.get('/v1/projects', api.listProjects);
    app.get('/v1/projects/:projectId', api.listByProject);
}