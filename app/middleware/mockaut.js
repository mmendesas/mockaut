var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var unirest = require("unirest");
var cached = require('./cached-items');

var mockautMW = {

    run: function () {

        return function (req, res, next) {
                        
            var projectName = req.url.match(/(\/\w+)/)[1];
            var path = req.url.replace(projectName, '');
            projectName = projectName.match(/(\w+)/)[1];

            // console.log('project 55', projectName)
            // console.log('path', path);
            // console.log('url', req.url);
            // console.log('TESTOLA', cached.locations.length);

            var rule = cached.locations.find(
                x =>
                    x.path === path &&
                    x.method.toUpperCase() === req.method.toUpperCase() &&
                    x.project.toUpperCase() === projectName.toUpperCase()
            );

            if (rule) {

                // console.log('%s %s', req.method, req.url);

                var uniReq = unirest(req.method, "http://localhost:8080/bin/" + rule.mockID);

                uniReq.end(function (response) {

                    // console.log(response.statusCode);
                    // console.log(JSON.stringify(response.headers));

                    if (response.error) throw new Error(response.error);
                    res.send(response.body);
                });

            } else {
                next();
            }
        }
    }
}

module.exports = mockautMW;
