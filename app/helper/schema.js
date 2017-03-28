
var schema = {

    parseJSONSchema: function (JSONSchema, returnFunction) {

        var walkObject = function (PROPS) {
            var $child = {};

            if (returnFunction == true) {
                $child = new function () { };
            }

            for (var key in PROPS) {
                // console.log("key:" + key + " type:" + PROPS[key].type + " default:" + PROPS[key].default);
                // if (key === 'billing_address') { var x = 0; }

                if (!PROPS[key].type) {
                    $child[key] = walkObject(PROPS[key].properties);
                }

                switch (PROPS[key].type) {
                    case "boolean":
                        $child[key] = PROPS[key].default || false;
                        break;

                    case "integer":
                    case "number":
                        $child[key] = PROPS[key].default || 0;
                        break;

                    case "array":
                        // $child[key] = [].push(walkObject(PROPS[key].properties));
                        var aList = [];
                        aList.push(walkObject(PROPS[key].items.properties));
                        $child[key] = aList;
                        break;

                    case "object":
                        $child[key] = walkObject(PROPS[key].properties);
                        break;

                    case "string":
                        $child[key] = PROPS[key].default || "string";
                        if (PROPS[key].format === 'date-time')
                            $child[key] = new Date().toJSON();
                        break;
                };
            };

            return $child;
        }

        return walkObject(JSONSchema.properties);
    }

};

module.exports = schema;