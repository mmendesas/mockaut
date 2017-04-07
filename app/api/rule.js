var api = {}
var mongoose = require('mongoose');

//get the rule model
var model = mongoose.model('Rule');

//GET /v1/rules
api.list = function (req, res) {
    model
        .find()
        .then(function (rules) {
            res.json(rules);
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
    model
        .create(req.body)
        .then(function (rule) {
            res.json(rule);
        }, function (err) {
            console.log(err);
            res.status(500).json(err);
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
};

module.exports = api;