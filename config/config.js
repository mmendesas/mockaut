var helperString = require('../app/helper/string');

var config = {
    host: '127.0.0.1',
    port: 3000,
    getServer: function () {
        return helperString.formatString('http://{0}:{1}', [this.host, this.port]);
    }
}

module.exports = config;