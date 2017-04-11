var http = require('http');
var unirest = require("unirest");
var cached = require('./cached-items');
var helperString = require('../helper/string');
var _ = require('lodash');

var mockautmid = {

    run: function (app) {
        return function (req, res, next) {

            var projectName = req.url.match(/(\/\w+)/)[1];
            var path = req.url.replace(projectName, '');
            projectName = projectName.match(/(\w+)/)[1];

            //console.log(helperString.formatString("URL:{0} --|-- Project:{1} | Path:{2} | Cached:{3}", [req.urlpath, projectName, path, cached.currentRules.length]));

            if (cached.makeReload) {
                reloadCache();
            }

            if (cached.projectList.length > 0) {
                var projID = cached.projectList.find(x => x.name.toUpperCase() === projectName.toUpperCase());
            }

            if (projID) {
                var rule = cached.currentRules.find(
                    x =>
                        x.path === path &&
                        x.method.toUpperCase() === req.method.toUpperCase() &&
                        x.project_id === projID._id
                );
            }

            if (rule) {
                //console.log('%s %s', req.method, req.url);

                //make response based on HAR file
                //var resHAR = rule.response;
                makeResponse(rule.response, res);

            } else {
                next();
            }
        }
    }
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

module.exports = mockautmid;
