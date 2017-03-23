var api = {}
var projects = [
    { _id: 1, name: 'OMS', description: 'atirei o pau no gato to to' },
    { _id: 2, name: 'TED', description: 'talking to me' },
    { _id: 3, name: 'WALNUT', description: 'walnut teste' }
]

//GET /v1/projects
api.listProjects = function (req, res) {
    res.json(projects);
};

api.listByProject = function (req, res) {

    var projId = parseInt(req.params.projectId);
    var project = projects.find(function (project) {
        return project._id == projId;
    });
    res.json(project);
};

module.exports = api;