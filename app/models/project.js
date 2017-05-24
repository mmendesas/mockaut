var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
});

mongoose.model('Project', projectSchema);