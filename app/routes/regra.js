var path = require('path');

module.exports = function (app) {

    var api = app.api.regra;

    app.route('/v1/regras')
        .get(api.lista)
        .post(api.adiciona);

    app.route('/v1/regras/:id')
        .get(api.buscaPorId)
        .delete(api.removePorId)
        .put(api.atualiza);
};