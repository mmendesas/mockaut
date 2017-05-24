var mongoose = require('mongoose');

var match_item = new mongoose.Schema({
    path: { type: String },
    match: { type: String },
    value: { type: String }
});

//configura o schema para a Regra
var ruleShema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        isDefault: { type: Boolean, required: true },
        match_info: {
            method: { type: String, required: true },
            project_name: { type: String, require: true },
            path: { type: String, required: true },
            sequence: { type: Number },
        },
        expected: {},//[match_item],
        response: { type: Object }
    }
);



mongoose.model('Rule', ruleShema);