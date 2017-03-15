var api = {}
var CONTADOR = 2;
var regras = [
    { _id: 1, nome: 'Regra 001', descricao: 'Regra para endpoint /test' },
    { _id: 1, nome: 'Regra 001', descricao: 'Regra para endpoint /testAdmin' }
]

//GET /admin/regras
api.lista = function (req, res) {
    res.json(regras);
};

//POST /admin/regras
api.adiciona = function (req, res) {
    var regra = req.body;
    regra._id = ++CONTADOR;
    regras.push(regra);
    res.json(regra);
};

//GET /admin/regras/:id
api.buscaPorId = function (req, res) {

    var regra = regras.find(function (regra) {
        return regra._id == req.params.id;
    });

    res.json(regra);
};

//DELETE /admin/regras/:id
api.removePorId = function (req, res) {
    regras = regras.filter(function (regra) {
        return regra._id != req.params.id;
    });
    //envia apenas codigo de status
    res.sendStatus(204);
}

//PUT /admin/regras/:id
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