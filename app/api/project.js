var api = {}
var helperUpload = require('../helper/upload');
var mongoose = require('mongoose');
var mockaut = require('../middleware/mockaut');
var cached = require('../middleware/cached-items');
var unirest = require('unirest');
var config = require('../../config/config');

//get the project model
var model = mongoose.model('Project');

//GET /v1/projects
api.list = function (req, res) {
    model
        .find({})
        .then(function (projects) {
            res.json(projects);
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

//GET /v1/projects/:id
api.findById = function (req, res) {
    model
        .findById(req.params.id)
        .then(function (project) {
            if (!project) throw Error('Project not found!');
            res.json(project);
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

//DELETE /v1/projects/:id
api.removeById = function (req, res) {
    model
        .findByIdAndRemove(req.params.id)
        .then(function (project) {
            unirest
                .delete(config.getServer() + '/v1/rules/byProject/' + project.name)
                .end(function (response) {
                    //console.log(response.body);
                });
            res.sendStatus(204);
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

//POST /v1/projects
api.add = function (req, res) {

    var projectToSave = req.body;

    model.find({ name: projectToSave.name }, function (err, docs) {
        if (!docs.length) {
            model
                .create(projectToSave)
                .then(function (project) {
                    res.location('/v1/projects/' + project._id);
                    res.status(201).json(project);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
            cached.makeReload = true;
        } else {
            var msg = "Project [" + projectToSave.name + "] already exists";
            console.log(msg);
            res.status(422).send({ "messsage": msg });
        }
    });
};

//PUT /v1/projects/:id
api.update = function (req, res) {
    model
        .findByIdAndUpdate(req.params.id, req.body)
        .then(function (project) {
            res.json(project);
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

module.exports = api;