var helperUpload = require('../helper/upload');
var api = {}
var COUNT = 3;

var mockaut = require('../middleware/mockaut')

var projects = [
    { _id: 1, name: 'OMS', description: 'atirei o pau no gato to to', locations: [] },
    { _id: 2, name: 'TED', description: 'ciranda cirandinha', locations: [] },
    { _id: 3, name: 'WALNUT', description: 'acredite, se quiser', locations: [] }
];

//GET /v1/projects
api.list = function (req, res) {
    res.json(projects);
};

//POST /v1/projects
api.add = function (req, res) {
    var project = req.body;
    project._id = ++COUNT;
    projects.push(project);
    res.json(project);
};

//GET /v1/projects/:id
api.findById = function (req, res) {
    var project = projects.find(function (project) {
        return project._id == req.params.id;
    });
    res.json(project);
};

//DELETE /v1/projects/:id
api.removeById = function (req, res) {
    projects = projects.filter(function (project) {
        return project._id != req.params.id;
    });
    res.sendStatus(204);
};

//PUT /v1/projects/:id
api.update = function (req, res) {
    var projectID = req.params.id;
    var project = req.body;

    var idx = projects.findIndex(function (project) {
        return project._id == projectID;
    });

    projects[idx] = project;
    res.sendStatus(200);
};

//POST /upload
api.uploadFile = function (req, res) {
    helperUpload.uploadFile(req, res);
};

api.listByProject = function (req, res) {
    var projId = parseInt(req.params.projectId);
    var project = projects.find(function (project) {
        return project._id == projId;
    });
    res.json(project);
};

module.exports = api;