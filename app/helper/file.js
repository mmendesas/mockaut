var path = require('path');
var fs = require('fs');

var file = {

    ensureDirectoryExistence: function (filePath) {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        this.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    },

    readContentFromFile: function (filename) {
        return fs.readFileSync(filename, 'utf8');
    },

    writeContentToFile: function (data, filename) {
        fs.writeFile(filename, data, 'utf8');
    }
}

module.exports = file;