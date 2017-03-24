var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var unirest = require("unirest");

var rules = [
    { method: 'GET', path: '/groselha', url: '54c1e591-4f42-438a-b583-03cff0d910f1' },
    { method: 'GET', path: '/hello', url: '0893d367-97c2-4901-93af-bf17ffcc4da9' },
    { method: 'PUT', path: '/hello', url: 'GROSELHASDFASDFASDFASDFADF' }
];

var mid = function (options) {

    return function (req, res, next) {

        console.log('%s %s', req.method, req.url);

        var rule = rules.find(x => x.path === req.url && x.method === req.method);

        if (rule) {

            var uniReq = unirest(req.method, "http://mockbin.org/bin/" + rule.url);

            uniReq.end(function (response) {

                if (response.error) throw new Error(response.error);

                console.log(response.statusCode);
                console.log(JSON.stringify(response.headers));

                res.send(response.body);
            });

        } else {
            next();
        }
    }
}

module.exports = mid;
