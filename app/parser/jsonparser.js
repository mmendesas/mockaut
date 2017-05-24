var jp = require('jsonpath');

var jsonparser = {

    jsonObj: null,

    /**
     * Set the current JSON
     */
    init: function (jsonObj) {
        this.jsonObj = jsonObj;
    },

    /**
    * Returns the value from a Key (find by jsonpath)
    */
    getValue: function (path) {
        return jp.query(this.jsonObj, path);
    },

    /**
    * Set the value for a Key (find by jsonpath)
    */
    setValue: function (path, value) {
        jp.value(this.jsonObj, path, value);
    }
}

module.exports = jsonparser;