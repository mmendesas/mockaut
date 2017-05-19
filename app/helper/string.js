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
    },

    compare: function (current, type, received) {

        var comparisson = { result: null, msg: null };
        type = type.trim().toLowerCase().replace(/\s/gi, '');

        current = current.toString();
        received = received.toString();

        switch (type) {
            case 'whichcontains':
                comparisson.result = current.includes(received);
                comparisson.msg = helperString.formatString('Current value [{0}] not contains [{1}]', [current, received]);
                break;

            case 'whichnotcontains':
                comparisson.result = !current.includes(received);
                comparisson.msg = helperString.formatString('Current value [{0}] contains [{1}]', [current, received]);
                break;

            case 'equalsto':
                comparisson.result = current === received;
                comparisson.msg = helperString.formatString('Current value [{0}] not equals to [{1}]', [current, received]);
                break;

            case 'notequalsto':
                comparisson.result = current !== received;
                comparisson.msg = helperString.formatString('Current value [{0}] is equals to [{1}]', [current, received]);
                break;

            default:
                break;
        }

        if (comparisson.result) comparisson.msg = '';

        return comparisson;
    }
}

module.exports = string;