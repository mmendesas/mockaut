var api = {}
var CONTADOR = 3;
var regras = [
    { _id: 1, name: 'Regra 001', description: 'Regra para endpoint /test', path: '/test', project: 'M2' },
    { _id: 2, name: 'Regra 002', description: 'Regra para endpoint /testAdmin', path: '/testAdmin', project: 'M2' },
    { _id: 3, name: 'Regra 002', description: 'Regra para endpoint /testAdmin', path: '/testGroselha', project: 'M3' }
]

//GET /v1/regras
api.lista = function (req, res) {
    res.json(regras);
};

//POST /v1/regras
api.adiciona = function (req, res) {
    var regra = req.body;
    regra._id = ++CONTADOR;
    regras.push(regra);
    res.json(regra);
};

//GET /v1/regras/:id
api.buscaPorId = function (req, res) {

    var regra = regras.find(function (regra) {
        return regra._id == req.params.id;
    });

    res.json(regra);
};

//DELETE /v1/regras/:id
api.removePorId = function (req, res) {
    regras = regras.filter(function (regra) {
        return regra._id != req.params.id;
    });
    //envia apenas codigo de status
    res.sendStatus(204);
}

//PUT /v1/regras/:id
api.atualiza = function (req, res) {
    var regraId = req.params.id;
    var regra = req.body;

    var indice = regras.findIndex(function (regra) {
        return regra._id == regraId;
    })

    regras[indice] = regra;
    res.sendStatus(200);
}

module.exports = api;