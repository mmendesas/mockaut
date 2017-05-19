var http = require('http');
var unirest = require("unirest");
var cached = require('./cached-items');
var helperString = require('../helper/string');
var helperHAR = require('../helper/har');
var _ = require('lodash');

var mockautMiddleware = {

    run: function (app) {
        return function (req, res, next) {

            var pathname = req._parsedUrl.pathname;
            var projectName = pathname.match(/(\/\w+)/)[1];
            var path = pathname.replace(projectName, '');
            projectName = projectName.match(/(\w+)/)[1];

            // console.log(helperString.formatString("URL:{0} --|-- Project:{1} | Path:{2} | Cached:{3}", [req.url, projectName, path, cached.currentRules.length]));

            if (cached.makeReload) {
                reloadCache();
            }

            if (cached.projectList.length > 0) {
                var _project = cached.projectList.find(x => x.name.toUpperCase() === projectName.toUpperCase());
            }

            var rule;
            if (_project) {
                rule = cached.currentRules.find(
                    x =>
                        x.match_info.path === path &&
                        x.match_info.method.toUpperCase() === req.method.toUpperCase() &&
                        x.match_info.project_name === _project.name
                );
            }

            if (rule) {

                var reqReceived = helperHAR.createRequestFromExpressReq(req);

                //validate request
                if (validate(rule.expected, reqReceived)) {
                    //console.log('%s %s', req.method, req.url);

                    //make response based on HAR file
                    //var resHAR = rule.response;
                    makeResponse(rule.response, res);
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    }
}

function validate(jsonExpected, request) {

    _.forEach(jsonExpected, function (itemToValidade) {

        if(itemToValidade.match){      
            //helperString.compare(itemToValidade.method, )      
        }
    })

    
    console.log(request);

    return false;
}



function reloadCache() {
    unirest
        .get('http://localhost:3300/v1/projects')
        .end(function (response) {
            cached.projectList = response.body;
        });

    unirest
        .get('http://localhost:3300/v1/rules')
        .end(function (response) {
            cached.currentRules = response.body;
        });

    cached.makeReload = false;
}

function makeResponse(resHAR, res) {

    _.forEach(resHAR.headers, function (header) {
        res.setHeader(header.name, header.value);
    });

    _.forEach(resHAR.cookies, function (cookie) {
        res.cookie(cookie.name, cookie.value);
    });

    res.statusCode = resHAR.status;
    res.statusMessage = resHAR.statusText;
    res.send(resHAR.content.text);
}

module.exports = mockautMiddleware;
