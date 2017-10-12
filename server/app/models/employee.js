var mongoose = require('mongoose');

var EmployeeSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    cellPhone: String,
    address: String,
    title: String,
    company: {type:mongoose.Schema.Types.ObjectId,
        ref:'Company'},
    department: {type:mongoose.Schema.Types.ObjectId,
        ref:'Department'},
    startDate: Date,
    endDate: Date

});

module.exports = mongoose.model('Employee', EmployeeSchema);
