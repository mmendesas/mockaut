var api = {}
var CONTADOR = 3;
var rules = [
    { _id: 1, name: 'Rule 001', description: 'Regra para endpoint /test', path: '/test', project: 'M2' },
    { _id: 2, name: 'Rule 002', description: 'Regra para endpoint /testAdmin', path: '/testAdmin', project: 'M2' },
    { _id: 3, name: 'RUle 003', description: 'Regra para endpoint /test/Admin887', path: '/testGroselha', project: 'M3' }
]

//GET /v1/rules
api.list = function (req, res) {
    res.json(rules);
};

//POST /v1/rules
api.add = function (req, res) {
    var rule = req.body;
    rule._id = ++CONTADOR;
    rules.push(rule);
    res.json(rule);
};

//GET /v1/rules/:id
api.findByID = function (req, res) {

    var rule = rules.find(function (regra) {
        return regra._id == req.params.id;
    });

    res.json(rule);
};

//DELETE /v1/rules/:id
api.removeByID = function (req, res) {
    rules = rules.filter(function (rule) {
        return rule._id != req.params.id;
    });
    //envia apenas codigo de status
    res.sendStatus(204);
}

//PUT /v1/rules/:id
api.update = function (req, res) {
    var ruleID = req.params.id;
    var rule = req.body;

    var idx = rules.findIndex(function (rule) {
        return rule._id == ruleID;
    })

    rules[idx] = rule;
    res.sendStatus(200);
}

module.exports = api;