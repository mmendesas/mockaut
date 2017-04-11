var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var helperSwagger = require('./helper/swaggerwalker');
var helperReq = require('./helper/request');
var Table = require('cli-table');
var _ = require('lodash');
var async = require("async");

console.time('elapsed');

// swagger do oms:  http://dft-us-qa-sidious-api.aws.dafitidev.com.br/api-docs/index.html

parser.dereference("/home/mmendes/Developer/estudo/mymock/samples/oms.swagger.json")
    .then(function (api) {

        helperSwagger.api = api;
        helperSwagger.createResponses();

        // create the HAR responses
        var listItems = helperSwagger.getResponses();

        console.log('mteste', listItems[0])

        var resHAR = listItems[0].responseHAR;
        console.log(JSON.stringify(resHAR));


        var express = require('express');
        var app = express();

        app.get('/mm/mteste', function (req, res) {

            _.forEach(resHAR.headers, function (header) {
                res.setHeader(header.name, header.value);
            });

            _.forEach(resHAR.cookies, function (cookie) {
                res.cookie(cookie.name, cookie.value);
            });

            res.statusCode = resHAR.status;
            res.statusMessage = resHAR.statusText;

            res.send(resHAR.content.text);
            console.log('passou');
            res.end();
        });

        app.listen(3000);




        // createRelatedMockIDs(listItems, function (listItemsOK) {
        //     //mount table to log purposes
        //     var table = new Table({
        //         head: ['description', 'code', 'operation', 'path / route', 'id'],
        //         colWidths: [15, 7, 15, 50, 50]
        //     });

        //     _.forEach(listItemsOK, function (item) {
        //         table.push([item.description, item.respCode, item.operation, item.path, item.mockID]);
        //     });

        //     console.log(table.toString());
        // });
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