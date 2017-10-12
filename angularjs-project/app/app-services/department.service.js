(function () {
    'use strict';

    angular
        .module('app')
        .factory('DepartmentService', DepartmentService);
    DepartmentService.$inject = ['$http'];
    function DepartmentService($http) {
        var service = {};

        service.GetDepartments = GetDepartments;
        service.DeleteDepartment = DeleteDepartment;
        service.AddDepartment = AddDepartment;

        return service;

        function GetDepartments(companyId, callback) {
            $http.get('http://localhost:3000/api/departments/'+companyId)
                .then(function (response) {
                    return callback(response.data)
                });
        }

        function DeleteDepartment(id, callback) {
            $http.delete('http://localhost:3000/api/departments/'+id)
                .then(function (response) {
                    return callback(response.data);
                });
        }

        function AddDepartment(department, callback) {
            $http.post('http://localhost:3000/api/departments', department)
                .then(function (response) {
                    return callback(response.data);
                });
        }

    }
})();