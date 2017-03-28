var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var api = {}
var COUNT = 3;

var projects = [
    { _id: 1, name: 'OMS', description: 'atirei o pau no gato to to' },
    { _id: 2, name: 'TED', description: 'talking to me' },
    { _id: 3, name: 'WALNUT', description: 'walnut teste' }
]

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
}

//GET /v1/projects/:id
api.findById = function (req, res) {
    var project = projects.find(function (project) {
        return project._id == req.params.id;
    });
    res.json(project);
}

//DELETE /v1/projects/:id
api.removeById = function (req, res) {
    projects = projects.filter(function (project) {
        return project._id != req.params.id;
    });
    res.sendStatus(204);
}

//PUT /v1/projects/:id
api.update = function (req, res) {
    var projectID = req.params.id;
    var project = req.body;

    var idx = projects.findIndex(function (project) {
        return project._id == projectID;
    });

    projects[idx] = project;
    res.sendStatus(200);
}

api.listByProject = function (req, res) {

    var projId = parseInt(req.params.projectId);
    var project = projects.find(function (project) {
        return project._id == projId;
    });
    res.json(project);
};

api.uploadFile = function (req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory    
    form.uploadDir = path.join(__dirname, '../../uploads');    

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
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
};



module.exports = api;