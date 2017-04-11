var cached = require('../middleware/cached-items');
var api = {}
var _ = require('lodash');
var path = require('path');
var helperUpload = require('../helper/upload');
var helperSwgFile = require('../helper/swgfile');
var unirest = require('unirest');

//POST /v1/swgfile/process/:filename
api.processFile = function (req, res) {

    var filename = req.params.filename;
    var projectID = req.body._id;
    var filepath = path.resolve(__dirname, '../../uploads/' + filename);

    console.log('filename', filename);
    console.log('projectID', projectID);

    helperSwgFile
        .processFile(filepath)
        .then(function (myEndpointList) {
            console.log(myEndpointList.length);
            _.forEach(myEndpointList, function (myEndpoint, index) {

                // create a rule based on endpoint 
                var myRule = {
                    project_id: projectID,
                    name: 'Default Rule ' + index,
                    description: myEndpoint.description,
                    sequence: index,
                    isDefault: true,
                    path: myEndpoint.path,
                    method: myEndpoint.method,
                    mockID: 0,
                    expected: {},
                    response: myEndpoint.responseHAR
                }

                // and save in db
                unirest.post('http://localhost:3300/v1/rules')
                    .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
                    .send(myRule)
                    .end(function (response) {
                        //console.log(response.body);
                    });
            });

            cached.currentRules.push.apply(cached.currentRules, myEndpointList);
            console.log('cached list updated: ' + cached.currentRules.length + ' items');

            res.sendStatus(204);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        });
};

//POST /v1/swgfile/upload
api.uploadFile = function (req, res) {
    helperUpload.uploadFile(req, res);
};

module.exports = api;