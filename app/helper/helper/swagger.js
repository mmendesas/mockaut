var _ = require('lodash');
var helperSchema = require('./schema');
var helperHar = require('./har');
var item = require('../models/item');

var swagger = {

    api: null,

    itemList: null,

    createResponses: function () {
        itemList = [];

        // get all paths        
        _.each(this.api.paths, function (path, pathKey) {
            // console.log('\n-----------------------------------------------------------');
            // console.log('PATH', pathKey, '\n');

            //Print each path parameter
            _.each(path, function (operation, operKey) {
                // console.log('OPERATION', operKey);                
                helperHar.contentType = operation.produces;

                _.each(operation.responses, function (response, respKey) {
                    // console.log('  ', 'RESPO', respKey);
                    var itemObj = '';

                    if (response.schema) {
                        switch (response.schema.type) {
                            case 'array':
                                itemObj = helperSchema.parseJSONSchema(response.schema.items, true);
                                var array = [];
                                array.push(itemObj);
                                itemObj = array;
                                // console.log('    ', 'ARRAY', JSON.stringify(itemObj));
                                break;

                            case 'object':
                                itemObj = helperSchema.parseJSONSchema(response.schema, true);
                                // console.log('    ', 'OBJECT', itemObj);
                                break;

                            default:
                                break;
                        }
                    }

                    var harResp = helperHar.createResponse(respKey, response, itemObj);
                    // console.log('\n  ', 'HAR', JSON.stringify(harResp));

                    item = {
                        description: response.description,
                        operation: operKey,
                        path: pathKey,
                        respCode: respKey,
                        responseHAR: harResp
                    }

                    itemList.push(item);

                });
            });
        });
    },

    getResponses: function () {
        return itemList;
    }
};

module.exports = swagger;