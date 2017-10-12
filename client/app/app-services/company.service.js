(function () {
    'use strict';

    angular
        .module('app')
        .factory('CompanyService', CompanyService);
    CompanyService.$inject = ['$http'];
    function CompanyService($http) {
        var service = {};

        service.GetCompanies = GetCompanies;
        service.DeleteCompany = DeleteCompany;
        service.AddCompany = AddCompany;

        return service;

        function GetCompanies(callback) {
            $http.get('http://localhost:3000/api/companies')
                .then(function (response) {
                    return callback(response.data)
                });
        }

        function DeleteCompany(id, callback) {
            $http.delete('http://localhost:3000/api/companies/'+id)
                .then(function (response) {
                    return callback(response.data);
                });
        }

        function AddCompany(company, callback) {
            $http.post('http://localhost:3000/api/companies', company)
                .then(function (response) {
                    return callback(response.data);
                });
        }

    }
})();