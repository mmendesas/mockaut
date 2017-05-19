var expect = require('chai').expect;
var helperSwgFile = require('../app/helper/swgfile')
var path = require('path');

describe('Helper SwgFile Tests', function () {

    it('should be process simple swagger file', function (done) {
        var filepath = path.resolve(__dirname, './samples/petstore.json');

        helperSwgFile.processFile(filepath).then(function (list) {
            expect(list).to.have.lengthOf(4);
            expect(list[0].description).to.equal('List all pets');
            expect(list[1].description).to.equal('Make a new pet');
            expect(list[2].description).to.equal('Updates the pet');
            expect(list[3].description).to.equal('Sends the pet with pet Id');
            done();
        });
    });

});