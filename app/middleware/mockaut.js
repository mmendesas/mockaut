var unirest = require("unirest");
var cached = require('./cached-items');
var helperString = require('../helper/string');
var helperHAR = require('../helper/har');
var jsonparser = require('../parser/jsonparser');
var _ = require('lodash');

var mockautMiddleware = {

    run: function (app) {
        return function (req, res, next) {

            var callNext = true;

            // create received match_info
            var req_match_info = mountMatchInfo(req);

            // console.log(helperString.formatString("URL:{0} --|-- Project:{1} | Path:{2} | Cached:{3}", [req.url, match_info.project_name, match_info.path, cached.currentRules.length]));

            // load simple cache
            if (cached.makeReload) {
                reloadCache();
            }

            if (cached.projectList.length > 0) {

                // search for project
                var _project =
                    cached
                        .projectList
                        .find(x => x.name.toUpperCase() === req_match_info.project_name.toUpperCase());

                // search for rule            
                if (_project) {

                    // filter for rules that match
                    var rules = cached.currentRules.filter(
                        x =>
                            x.match_info.path === req_match_info.path &&
                            x.match_info.method.toUpperCase() === req.method.toUpperCase() &&
                            x.match_info.project_name.toUpperCase() === _project.name.toUpperCase()
                    );

                    // sort items by sequence
                    rules.sort(function (a, b) {
                        return a.match_info.sequence - b.match_info.sequence;
                    });

                    if (rules.length > 0) {

                        for (var i = 0; i < rules.length; i++) {

                            // create a requestHar for validation
                            var rule = rules[i];
                            var reqReceived = helperHAR.createRequestFromExpressReq(req);

                            if (req.headers['mockautdebug'] == 'harRequest') {
                                console.log('HAR Request:\n', helperHAR.requestToString(reqReceived));
                            }

                            //validate all field in request
                            if (allFieldsMatch(rule.expected, reqReceived)) {
                                //make response based on HAR file
                                makeResponse(rule.response, res);
                                callNext = false;
                                break; //send only first matched
                            }
                        }
                    }
                }
            }

            if (callNext) next();
        }
    }
}

function mountMatchInfo(req) {

    var pathname = req._parsedUrl.pathname;
    var projectName = pathname.match(/(\/\w+)/)[1];
    var path = pathname.replace(projectName, '');
    projectName = projectName.match(/(\w+)/)[1];

    var match_info = {};
    match_info.path = path == '' ? '/' : path;
    match_info.project_name = projectName;

    return match_info;
}

function allFieldsMatch(jsonExpected, request) {

    var result = true;
    jsonparser.init(request);

    _.forEach(jsonExpected, function (expItem) {
        if (expItem.match !== 'none') {
            var reqValue = jsonparser.getValue(expItem.path)[0];
            var comparisson = helperString.compare(expItem.value, expItem.match, reqValue);

            if (comparisson.result !== true) result = false;
        }
    });

    return result;
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
