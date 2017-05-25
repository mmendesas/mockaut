var express = require('express');
var app = express();
var path = require('path');
var consign = require('consign');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

var mmw = require('../app/middleware/mockaut');
var merr = require('../app/middleware/error-handler');

// load resources
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'node_modules')));

// set bodyParser (json, xml)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml());

// start mockaut middleware
app.use(mmw.run(app));

// log errors (test)
app.use(merr.logErrors);
app.use(merr.clientErrorHandler);
app.use(merr.errorHandler);

// load the files and put app into them
consign({ cwd: 'app' })
    .include('models')
    .then('api')
    .then('routes')
    .into(app);

// enable HTML5MODE
app.all('/*', function (req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;