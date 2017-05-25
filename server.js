var http = require('http');
var app = require('./config/express');
require('./config/database')('localhost/mockaut_db');
//var db = require('./config/localDB');
var config = require('./config/config');

http.createServer(app)
    .listen(3300, function () {
        config.port = this.address().port;
        console.log('Servidor executando na porta: ' + config.port);
    });


// perfTest: roda por 10seg, mantendo 200 conexões
// wrk -c200 -d10s http://127.0.0.1:3300/projecta/mteste