var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Company', CompanySchema);