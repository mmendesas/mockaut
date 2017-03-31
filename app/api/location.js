var cached = require('../middleware/cached-items');
var api = {}

var locationList = [
    { _id: 1, description: 'Order found', code: '200', method: 'get', path: '/orders/{orderNumber}/history', mockID: '39a0abf6-4f0c-4165-9769-cfc4837415ab', project: 'oms' },
    { _id: 2, description: 'Order stored', code: '204', method: 'post', path: '/orders/{orderNumber}/history', mockID: '8ae2fa90-8e11-4b8f-8685-06df1df6f889', project: 'oms' },
    { _id: 3, description: 'Order found', code: '200', method: 'get', path: '/orders', mockID: 'ec6d25b6-ad7c-4dc6-967b-247f8396c26b', project: 'oms' },
    { _id: 4, description: 'Order stored', code: '204', method: 'post', path: '/orders', mockID: '479a0cc0-dabb-4dba-a4ff-f035b9cdcf7a', project: 'oms' },
    { _id: 5, description: 'Order found', code: '200', method: 'get', path: '/orders/{orderNumber}', mockID: '7feeec82-937a-4bcb-a2e1-ee68f42aac2d', project: 'oms' },
    { _id: 6, description: 'Order stored', code: '204', method: 'post', path: '/orders/{orderNumber}', mockID: 'fe8d081e-1c7d-461d-83dd-0c2d084b2e87', project: 'oms' },
    { _id: 7, description: 'Service full', code: '200', method: 'get', path: '/healthcheck', mockID: '47c7d7aa-4744-4575-ac79-6dae41cf1da7', project: 'oms' },
];

//GET /v1/locations
api.list = function (req, res) {
    cached.locations.push.apply(cached.locations, locationList);
    console.log('cached list updated: ' + cached.locations.length + ' items')
    res.json(locationList);
};

//POST /v1/locations/:fileName
api.createLocations = function (req, res) {
    console.log('Criando lista de endereços com o arquivo: ' + req.params.fileName);
    res.sendStatus(204);
};

module.exports = api;