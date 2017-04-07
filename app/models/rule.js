var mongoose = require('mongoose');

//configura o schema para a Regra
var ruleShema = mongoose.Schema({
    project_id: { type: String, require: true },
    name: { type: String, required: true },
    description: { type: String },
    sequence: { type: Number },
    isDefault: { type: Boolean, required: true },
    path: { type: String, required: true },
    //method: { type: String, required: true },
    method: { type: String, required: false },
    mockID: { type: String },
    expected: { type: Object },
    response: { type: Object }
});

mongoose.model('Rule', ruleShema);