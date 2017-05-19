var api = {}
var helperUpload = require('../../helper/upload');
var mockaut = require('../../middleware/mockaut');
var cached = require('../../middleware/cached-items');
var db = require('../../../config/localDB');


//GET /v2/projects
api.list = function (req, res) {
    db.find({}).exec(function (err, projects) {
        if (err) return console.log(err);
        res.json(projects);
    });
};

//GET /v2/projects/:id
api.findById = function (req, res) {
    db.findOne({ _id: req.params.id }, function (err, project) {
        if (err) return console.log(err);
        res.json(project);
    })
};

//DELETE /v2/projects/:id
api.removeById = function (req, res) {
    db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('Project removido com sucesso');
        if (numRemoved) res.status(204).end();
        res.status(500).end();
    });
};

//POST /v2/projects
api.add = function (req, res) {
    db.insert(req.body, function (err, newProject) {
        if (err) return console.log(err);
        console.log('Projeto adicionado com sucesso: ' + newProject._id);
        res.json(newProject._id);
    });
    cached.makeReload = true;
};

//PUT /v2/projects/:id
api.update = function (req, res) {
    db.update({ _id: req.params.id }, req.body, function (err, numReplaced) {
        if (err) return console.log(err);
        if (numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Projeto Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });
};

module.exports = api;