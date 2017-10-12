var Employee = require('../models/employee');

// Get all Emplyees By Department
exports.getAllEmployeesByDepartment = function(req, res, next) {
    Employee.find({department: req.params.departmentId}, function(err, employees) {
       if(err){
          return res.send(err);
       }
      return res.json(employees);
    });
}

// Add Employee to a Company
exports.addEmployeeByDepartment = function(req, res, next) {
    Employee.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        cellPhone: req.body.cellPhone,
        address: req.body.address,
        title: req.body.title,
        company: req.body.company,
        department: req.body.department,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }, function (err, employee) {
        if(err){
           return res.send(err);
        }
        Employee.find({department: req.body.department}, function (err, employees) {
            if(err){
               return res.send(err);
            }
          return res.json(employees);
        });
    });
}
// Delete Employe
exports.deleteEmployee = function(req, res, next) {
    Employee.remove({_id: req.params.id}, function(err, employee) {
        if(err){
           return res.send(err);
        }
       return res.json(employee);
    });
}