var express = require('express');
var app = express();
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var mmw = require('../app/middleware/mockaut');
var merr = require('../app/middleware/error-handler');

app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mmw.run(app));
//app.use(merr.logErrors);
//app.use(merr.clientErrorHandler);
//app.use(merr.errorHandler);

//carrega os arquivos e passa o app como parametro pra eles
consign({ cwd: 'app' })
    .include('models')
    .then('api')
    .then('routes')
    .into(app);

// habilitando HTML5MODE
app.all('/*', function (req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;