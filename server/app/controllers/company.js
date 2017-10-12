var Company = require('../models/company');
var Department = require('../models/department');
var Employee = require('../models/employee');

// Get all Companies
exports.getCompanies = function(req, res, next){
    Company.find(function(err, Companies) {
        if(err){
            return res.send(err);
        }
        return res.json(Companies);
    });
}

// Create Company
exports.createCompany = function(req, res, next) {
    Company.create(req.body, function(err, company) {
        if(err){
            return res.send(err);
        }
        Company.find(function(err, companies) {
            if(err){
                return res.send(err);
            }
            return res.json(companies);
        });
    });
}

// delete Company
exports.deleteCompany = function(req, res, next) {
    Company.remove({_id: req.params.id}, function(err, company) {
        if(err){
            return res.send(err);
        }
        Department.remove({company: req.params.id}, function(err, department) {
            if(err){
                return res.send(err);
            }
            Employee.remove({company: req.params.id}, function(err, employee) {
                if(err){
                   return res.send(err);
                }
               return res.send("success");
            });
        });
    });
}