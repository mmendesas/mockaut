var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var helperSwagger = require('./swaggerwalker');
var helperReq = require('./request');
var Table = require('cli-table');
var _ = require('lodash');
var async = require("async");
var fs = require('fs');

var swgfile = {

    listProcessedItems: [],

    /**
    * Format string with parameters replacement
    */
    processFile: function (filepath) {
        return new Promise(function (fulfill, reject) {

            if (fs.existsSync(filepath)) {
                parser
                    .dereference(filepath)
                    .then(function (api) {
                        helperSwagger.api = api;
                        helperSwagger.createResponses();
                        var listItems = helperSwagger.getResponses();

                        // return the HAR responses
                        fulfill(listItems);
                    });
            } else {
                reject('File not found!');
            }
        });
    },

    createRelatedMockIDsInMockbin: function (listItems) {
        return new Promise(function (fulfill, reject) {
            //create all mockID relations
            async.forEach(listItems,
                function (item, done) {

                    //TODO: arrumar essa groselha
                    // putting the HAR in mockbin
                    helperReq.postHar(item.responseHAR, function (id) {
                        item.mockID = id;
                        done();
                    });

                }, function (err) {
                    if (err) {
                        reject(err)
                    };
                    listProcessedItems = listItems;
                    fulfill(listItems);
                });
        });
    }

}

module.exports = swgfile;