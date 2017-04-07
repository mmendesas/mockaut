var SwaggerParser = require('swagger-parser');
var parser        = new SwaggerParser();
var helperSwagger = require('./helper/swagger');
var helperReq     = require('./helper/request');
var Table         = require('cli-table');
var _             = require('lodash');
var async         = require("async");

console.time('elapsed');

// swagger do oms:  http://dft-us-qa-sidious-api.aws.dafitidev.com.br/api-docs/index.html

parser.dereference("/home/mmendes/Developer/estudo/mymock/samples/oms.swagger.json")
    .then(function (api) {

        helperSwagger.api = api;
        helperSwagger.createResponses();

        // create the HAR responses
        var listItems = helperSwagger.getResponses();

        createRelatedMockIDs(listItems, function (listItemsOK) {
            //mount table to log purposes
            var table = new Table({
                head: ['description', 'code', 'operation', 'path / route', 'id'],
                colWidths: [15, 7, 15, 50, 50]
            });

            _.forEach(listItemsOK, function (item) {
                table.push([item.description, item.respCode, item.operation, item.path, item.mockID]);
            });

            console.log(table.toString());
        });
    });

function createRelatedMockIDs(listItems, callback) {
    //create all mockID relations
    async.forEach(listItems,
        function (item, done) {
            // putting the HAR in mockbin
            helperReq.postHar(item.responseHAR, function (id) {
                item.mockID = id;
                done();
            });
        }, function (err) {
            if (err) throw err;
            callback(listItems);
        });
};

console.timeEnd('elapsed');