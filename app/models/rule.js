var mongoose = require('mongoose');

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
        expected: { type: Object },
        response: { type: Object }
    }
);

mongoose.model('Rule', ruleShema);