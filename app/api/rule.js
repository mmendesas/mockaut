var mongoose = require('mongoose');
var api = {}

var rulesCHANGE = [
    { _id: 1, name: 'Rule 001', description: 'Regra para endpoint /test', path: '/test', project: 'M2' },
    { _id: 2, name: 'Rule 002', description: 'Regra para endpoint /testAdmin', path: '/testAdmin', project: 'M2' },
    { _id: 3, name: 'RUle 003', description: 'Regra para endpoint /test/Admin887', path: '/testGroselha', project: 'M3' }
]

var model = mongoose.model('Rule');

//GET /v1/rules
api.list = function (req, res) {

    // model
    //     .find({})
    //     .then(function (rules) {
    //         res.json(rules);
    //     }, function (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });

    res.json(rulesCHANGE);
};

//POST /v1/rules
api.add = function (req, res) {

    // model
    //     .create(req.body)
    //     .then(function (rule) {
    //         res.json(rule);
    //     }, function (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });

    var rule = req.body;
    rule._id = ++CONTADOR;
    rulesCHANGE.push(rule);
    res.json(rule);
};

//GET /v1/rules/:id
api.findByID = function (req, res) {

    // model
    //     .findById(req.params._id)
    //     .then(function (rule) {
    //         if (!rule) throw Error('Rule not found!');
    //         res.json(rule);
    //     }, function (err) {
    //         console.log(err);
    //         res.status(404).json(err);
    //     });

    var rule = rulesCHANGE.find(function (regra) {
        return regra._id == req.params.id;
    });

    res.json(rule);
};

//DELETE /v1/rules/:id
api.removeByID = function (req, res) {
    // model
    //     .remove({ _id: req.params._id })
    //     .then(function () {
    //         res.sendStatus(204); // faz acao e nao devolve nada
    //     }, function (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });

    rulesCHANGE = rulesCHANGE.filter(function (rule) {
        return rule._id != req.params.id;
    });
    //envia apenas codigo de status
    res.sendStatus(204);
}

//PUT /v1/rules/:id
api.update = function (req, res) {

    // model
    //     .findByIdAndUpdate(req.params.id, req.body)
    //     .then(function (rule) {
    //         res.json(rule)
    //     }, function (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });


    var ruleID = req.params.id;
    var rule = req.body;

    var idx = rulesCHANGE.findIndex(function (rule) {
        return rule._id == ruleID;
    })

    rulesCHANGE[idx] = rule;
    res.sendStatus(200);
}

module.exports = api;