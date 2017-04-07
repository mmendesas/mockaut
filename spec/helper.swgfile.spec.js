var helperSwgFile = require('../app/helper/swgfile')
var path = require('path');

describe('Helper SwgFile Tests', function () {

    it('should be process simple swagger file', function (done) {
        var filepath = path.resolve(__dirname, './samples/petstore.json');

        helperSwgFile.processFile(filepath).then(function (list) {
            expect(list.length).toEqual(4);
            expect(list[0].description).toEqual('List all pets');
            expect(list[1].description).toEqual('Make a new pet');
            expect(list[2].description).toEqual('Updates the pet');
            expect(list[3].description).toEqual('Sends the pet with pet Id');
            done();
        });
    });

});