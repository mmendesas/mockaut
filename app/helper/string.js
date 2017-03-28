var string = {
    /**
    * Format string with parameters replacement
    */
    formatString: function (text, args) {
        var mgroup = text.match((/{(\d+)}/g));
        if (mgroup) {
            for (var i = 0; i < mgroup.length; i++) {
                text = text.replace(mgroup[i], args[i]);
            }
        }
        return text;
    }
}

module.exports = string;