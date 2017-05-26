var expect = require('chai').expect;
var helperString = require('../app/helper/string');

describe('Helper String Tests', function () {

    it('should be format simple text with one parameter', () => {
        var text = helperString.formatString("Angular with {0} is very cool", ["Cucumber"]);
        expect(text).to.equal("Angular with Cucumber is very cool");
    });

    it('should be format simple text with more than one parameter', () => {
        var text = helperString.formatString("Angular with {0} is {1} and very cool", ["Cucumber", "Amazing"]);
        expect(text).to.equal("Angular with Cucumber is Amazing and very cool");
    });

    it('should be process compare with all combinations', () => {

        var data =
            [
                // ['Current', 'Comparisson', 'Value', 'Result', 'Return MSG'],
                ['Black Dog', 'which contains', 'Dog', true, ''],
                ['Black Dog', 'contains', 'Dog', true, ''],
                ['Black Dog', 'which not contains', 'TS', true, ''],
                ['Black Dog', 'not contains', 'TS', true, ''],
                ['Black Dog', 'equals to', 'Black Dog', true, ''],
                ['Black Dog', 'equals', 'Black Dog', true, ''],
                ['Black Dog', 'not equals to', 'Dog', true, ''],
                ['Black Dog', 'not equals', 'Dog', true, ''],

                ['Black Dog', 'which contains', 'Kashimir', false, 'Current value [Black Dog] not contains [Kashimir]'],
                ['Black Dog', 'which not contains', 'Black Dog', false, 'Current value [Black Dog] contains [Black Dog]'],
                ['Black Dog', 'equals to', 'Kashimir', false, 'Current value [Black Dog] not equals to [Kashimir]'],
                ['Black Dog', 'not equals to', 'Black Dog', false, 'Current value [Black Dog] is equals to [Black Dog]'],

                ['Black Dog', '6547', 'Dog', false, '']
            ];

        for (var i = 0; i < data.length; i++) {
            var comparisson = helperString.compare(data[i][0], data[i][1], data[i][2]);
            expect(comparisson.result).to.equal(data[i][3]);
            expect(comparisson.msg).to.equal(data[i][4]);
        }

    });

});
