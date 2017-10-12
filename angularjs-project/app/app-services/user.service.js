(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        service.Create = Create;

        return service;

        function Create(user) {
            return $http.post('http://localhost:3000/api/auth/register', user).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
                return { success: false, message: error.data };

        }
    }

})();
