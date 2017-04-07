var helperString = require('../app/helper/string');

describe('helper string tests', function () {

    it('should be format simple text with one parameter', () => {
        var text = helperString.formatString("Angular with {0} is very cool", ["Cucumber"]);
        expect(text).toEqual("Angular with Cucumber is very cool");
    });

    it('should be format simple text with more than one parameter', () => {
        var text = helperString.formatString("Angular with {0} is {1} and very cool", ["Cucumber", "Amazing"]);
        expect(text).toEqual("Angular with Cucumber is Amazing and very cool");
    });

    it('should be format simple string with parameters', () => {
        var params = ["Water", "Sky"];
        var text = helperString.formatString("Smoke on the {0}, fire in the {1}", params);
        expect(text).toEqual("Smoke on the Water, fire in the Sky");
    });

});
