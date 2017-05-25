var mongoose = require('mongoose');

module.exports = function (uri) {

    mongoose.connect('mongodb://' + uri);

    mongoose.connection.on('connected', function () {
        console.log('Conectado ao MongoDB.\n')
    });

    mongoose.connection.on('error', function (error) {
        console.log('Erro na conexão: ' + error);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Desconectado do MongoDB.');
    });

    //when application is closed
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Conexão fechada pelo término da aplicação.');
            process.exit(0);
        });
    });
};