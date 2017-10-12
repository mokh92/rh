var mongoose = require('mongoose');

var DepartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {type:mongoose.Schema.Types.ObjectId,
        ref:'Company'}
});

module.exports = mongoose.model('Department', DepartmentSchema);
