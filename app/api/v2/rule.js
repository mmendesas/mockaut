var api = {};
var db = require('../../../config/localDB');
var cached = require('../../middleware/cached-items');

//GET /v2/rules
api.list = function (req, res, next) {
    db.find({}).exec(function (err, rules) {
        if (err) return console.log(err);
        res.json(rules);
    })
};

//GET /v2/rules/:id
api.findByID = function (req, res) {
    db.findOne({ _id: req.params.id }, function (err, rule) {
        if (err) return console.log(err);
        res.json(rule);
    })
};

//DELETE /v2/rules/:id
api.removeByID = function (req, res) {
    db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('item removido com sucesso');
        if (numRemoved) res.status(200).end();
        res.status(500).end();
    });
};

//POST /v2/rules
api.add = function (req, res) {
    db.insert(req.body, function (err, newRule) {
        if (err) return console.log(err);
        console.log('Adicionado com sucesso: ' + newRule._id);
        res.status(201).json(newRule._id);
    });
    cached.makeReload = true;
};

//PUT /v2/rules/:id
api.update = function (req, res) {
    db.update({ _id: req.params.id }, req.body, function (err, numReplaced) {
        if (err) return console.log(err);
        if (numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });
    cached.makeReload = true;
};

module.exports = api;