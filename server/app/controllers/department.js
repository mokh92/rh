var mongoose = require('mongoose');
var Department = require('../models/department');
var Employee = require('../models/employee');

// Get Depatments By Company Id
exports.getDepartmentsByCompany = function(req, res, next) {
    Department.find({company: req.params.companyId}, function(err, departments) {
        if(err){
            return res.send(err);
        }
        return res.json(departments);
    });
}

// Add a Department to a company
exports.addDepartmentByCompany = function(req, res, next) {
    Department.create({name: req.body.name, company: mongoose.Types.ObjectId(req.body.company)}, function(err, department) {
        if(err){
            return res.send(err);
        }
        Department.find({company: mongoose.Types.ObjectId(req.body.company)}, function(err, departments) {
            if(err){
                return res.send(err);
            }
            return res.json(departments);
        });
    });
}
// Delete a Department
exports.deleteDepartment = function (req, res, next) {
    Department.remove({_id: req.params.id}, function (err, department) {
        if(err){
            return res.send(err);
        }
        Employee.remove({department: req.params.id}, function(err, employee) {
            if(err){
               return res.send(err);
            }
            return res.send("success")
        });
    });
}
