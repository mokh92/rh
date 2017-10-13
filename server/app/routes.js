var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),
    CompanyController = require('./controllers/company'),
    DepartmentController = require('./controllers/department'),
    EmployeeController = require('./controllers/employee'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router(),
        companyRoutes = express.Router(),
        departmentRoutes = express.Router(),
        employeeRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Todo Routes
    /*apiRoutes.use('/todos', todoRoutes);

    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);*/

    // Company Routes
    apiRoutes.use('/companies', companyRoutes);

    companyRoutes.get('/', CompanyController.getCompanies);
    companyRoutes.post('/', CompanyController.createCompany);
    companyRoutes.delete('/:id', CompanyController.deleteCompany);

    // Department Routes
    apiRoutes.use('/departments', departmentRoutes);

    departmentRoutes.get('/', DepartmentController.getDepartments);
    departmentRoutes.get('/:companyId', DepartmentController.getDepartmentsByCompany);
    departmentRoutes.post('/', DepartmentController.addDepartmentByCompany);
    departmentRoutes.delete('/:id', DepartmentController.deleteDepartment);

    // Employee Routes
    apiRoutes.use('/employees', employeeRoutes);

    employeeRoutes.get('/:departmentId', EmployeeController.getAllEmployeesByDepartment);
    employeeRoutes.post('/', EmployeeController.addEmployeeByDepartment);
    employeeRoutes.delete('/:id', EmployeeController.deleteEmployee);
    // Set up routes
    app.use('/api', apiRoutes);

}