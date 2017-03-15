var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

//carrega os arquivos e passa o app como parametro pra eles
consign({ cwd: 'app' })
    .include('api')
    .then('routes')
    .into(app);

module.exports = app;
