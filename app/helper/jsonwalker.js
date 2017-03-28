var jsonwalker = {

    obj: null,

    get: function () {
        return this.obj;
    },

    create: function (obj) {
        this.obj = obj;
        return this;
    },

    find: function (name) {
        var obj = this.obj;
        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                if (typeof obj[i] == "object" && obj[i]) {
                    this.obj = obj[i];
                    this.find(name);
                }
            }
        } else {
            for (var prop in obj) {
                if (prop === name) {
                    this.obj = obj[prop];
                    return this;
                }

                if (typeof obj[prop] == "object" && obj[prop]) {
                    this.obj = obj[prop];
                    this.find(name);
                }
            }
        }
    },

    findNode: function (nodePath) {
        var paths = nodePath.split('|');
        for (var i = 0; i < paths.length; i++) {
            this.find(paths[i]);
        }
        return this;
    }
}

module.exports = jsonwalker;