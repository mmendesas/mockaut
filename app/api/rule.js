var api = {}
var mongoose = require('mongoose');
var cached = require('../middleware/cached-items');

mongoose.Promise = global.Promise
//get the rule model
var model = mongoose.model('Rule');
var projectModel = mongoose.model('Project');

//GET /v1/rules
api.list = function (req, res, next) {
    model
        .find()
        .then(function (rules) {
            res.json(rules);
            //console.log('caiuss aqui:\n', rules);
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

//GET /v1/rules/:id
api.findByID = function (req, res) {
    model
        .findById(req.params.id)
        .then(function (rule) {
            if (!rule) throw Error('Rule not found!');
            res.json(rule);
        }, function (err) {
            console.log(err);
            res.status(404).json(err);
        });
};

//DELETE /v1/rules/:id
api.removeByID = function (req, res) {
    model
        .findByIdAndRemove(req.params.id)
        .then(function () {
            res.sendStatus(204); // faz acao e nao devolve nada
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

//POST /v1/rules
api.add = function (req, res) {

    var ruleToSave = req.body;

    projectModel.find({ name: ruleToSave.match_info.project_name }, function (err, projectList) {
        if (projectList && projectList.length) {
            model
                .create(ruleToSave)
                .then(function (_rule) {
                    res.location('/v1/rules/' + _rule._id);
                    res.status(201).json(_rule);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
            cached.makeReload = true;
        } else {
            var msg = "Project [" + ruleToSave.match_info.project_name + "] not found";
            console.log(msg);
            res.status(422).send({ "messsage": msg });
        }
    });
};

//PUT /v1/rules/:id
api.update = function (req, res) {
    model
        .findByIdAndUpdate(req.params.id, req.body)
        .then(function (rule) {
            res.json(rule)
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
        });
    cached.makeReload = true;
};

module.exports = api;