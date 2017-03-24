var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mw = require('../app/middleware/mockaut');

app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mw());

//carrega os arquivos e passa o app como parametro pra eles
consign({ cwd: 'app' })
    .include('api')
    .then('routes')
    .into(app);

// habilitando HTML5MODE
app.all('/*', function (req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;