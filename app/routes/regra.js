module.exports = function (app) {

    var api = app.api.regra;

    app.route('/admin/regras')
        .get(api.lista)
        .post(api.adiciona);

    app.route('/admin/regras/:id')
        .get(api.buscaPorId)
        .delete(api.removePorId)
        .put(api.atualiza);
};
