var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var helperSwagger = require('./helper/swagger');
var helperReq = require('./helper/request');
var Table = require('cli-table');
var _ = require('lodash');

console.time('elapsed');

// swagger do oms:  http://dft-us-qa-sidious-api.aws.dafitidev.com.br/api-docs/index.html

parser.dereference("/home/mmendes/Developer/estudo/mymock/samples/oms.swagger.json")
    .then(function (api) {
        helperSwagger.api = api;
        helperSwagger.createResponses();

        // create the HAR responses
        var listItems = helperSwagger.getResponses();

        // putting the HAR in mockbin
        _.each(listItems, function (item) {

            var teste = helperReq.postHar(item.responseHAR, function (id) {
                item.mockID = id;
                console.log(id);
            });
            console.log(item.index);
        });

        Promise.all(listItems).then(function () {
            //mount table to log purposes
            var table = new Table({
                head: ['description', 'code', 'operation', 'path / route'],
                colWidths: [15, 7, 15, 50]
            });

            for (var i = 0; i < listItems.length; i++) {
                table.push([listItems[i].description, listItems[i].respCode, listItems[i].operation, listItems[i].path]);
            }

            console.log(table.toString());
        });
        
    });

console.timeEnd('elapsed');