var mongoose = require('mongoose');

//configura o schema para a Regra
var schema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    project_id: {
        type: Number,
        required: true
    }
});

mongoose.model('Rule', schema);