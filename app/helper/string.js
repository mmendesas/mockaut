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

        var comparisson = { result: false, msg: '' };
        type = type.trim().toLowerCase().replace(/\s/gi, '');

        //current = current.toString();
        //received = received.toString();

        switch (type) {
            case 'contains':
            case 'whichcontains':
                comparisson.result = current.includes(received);
                comparisson.msg = this.formatString('Current value [{0}] not contains [{1}]', [current, received]);
                break;

            case 'notcontains':
            case 'whichnotcontains':
                comparisson.result = !current.includes(received);
                comparisson.msg = this.formatString('Current value [{0}] contains [{1}]', [current, received]);
                break;

            case 'equals':
            case 'equalsto':
                comparisson.result = current === received;
                comparisson.msg = this.formatString('Current value [{0}] not equals to [{1}]', [current, received]);
                break;

            case 'notequals':
            case 'notequalsto':
                comparisson.result = current !== received;
                comparisson.msg = this.formatString('Current value [{0}] is equals to [{1}]', [current, received]);
                break;
        }

        if (comparisson.result) comparisson.msg = '';

        return comparisson;
    }
}

module.exports = string;