var http = require('http');
var app  = require('./config/express');
require('./config/database')('localhost/mockaut_db');
var db = require('./config/localDB');

http.createServer(app)
    .listen(3300, function () {
        console.log('Servidor executando na porta: ' + this.address().port);
    });