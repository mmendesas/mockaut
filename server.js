var http = require('http');
var app = require('./config/express');

http.createServer(app)
    .listen(3300, function () {
        console.log('Servidor iniciado na porta 3300!');
    });