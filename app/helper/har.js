var HAR  = require('har');
var http = require('http');

var har = {

    contentType: null,

    createResponse: function (key, response, itemObj) {

        var textContent = JSON.stringify(itemObj);
        var textSize = JSON.stringify(itemObj).length;

        return new HAR.Response({
            status: parseInt(key),
            statusText: http.STATUS_CODES[key],
            comment: response.description,
            headers: [
                new HAR.Header('Date', new Date().toUTCString()),
                new HAR.Header('Connection', 'keep-alive'),
                new HAR.Header('Content-Length', textSize.toString()),
                new HAR.Header('Content-Type', this.contentType[0]),
            ],
            content: new HAR.Content({
                mimeType: this.contentType[0],
                text: textContent,
                size: textSize
            })
        });
    }
};

module.exports = har;