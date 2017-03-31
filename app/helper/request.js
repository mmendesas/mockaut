var unirest = require('unirest');
var helperString = require('./string');
var async = require('async');

var request = {

    server: "localhost",

    port: 8080,

    path: "/bin/create",

    postHar: function (har, callback) {

        var endpoint = helperString.formatString("http://{0}:{1}{2}", [this.server, this.port, this.path]);

        unirest.post(endpoint)
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .type('json')
            .send(har)
            .end(function (response) {
                // console.log(response.body);                    
                callback(response.body);
            });
    }
}

module.exports = request;