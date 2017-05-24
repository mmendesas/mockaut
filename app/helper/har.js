var HAR = require('har');
var http = require('http');
var _ = require('lodash');

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
                new HAR.Header('Content-Type', this.contentType),
            ],
            content: new HAR.Content({
                mimeType: this.contentType[0],
                text: textContent,
                size: textSize
            })
        });
    },

    createRequestFromExpressReq: function (expressReq) {

        var request = new HAR.Request({
            method: expressReq.method,
            url: expressReq.headers['host'] + expressReq.url,
            httpVersion: 'HTTP/' + expressReq.httpVersion
        })

        // mount headers        
        for (var prop in expressReq.headers) {
            request.addHeader(new HAR.Header({
                name: prop,
                value: expressReq.headers[prop]
            }));
        }

        //mount queryString
        request.addQuery(expressReq.query);

        request.postData = new HAR.PostData({
            mimeType: expressReq.headers['content-type'],
            text: expressReq.body
        });

        return request;
    },

    requestToString: function (req) {
        var myResult = {
            method: req.method,
            url: req.url,
            httpVersion: req.httpVersion,
            cookies: req.cookies,
            headers: req.headers,
            queryString: req.queryString,
            postData: req.postData,
            comment: req.comment
        }
        return JSON.stringify(myResult, null, 2);
    }
};

module.exports = har;