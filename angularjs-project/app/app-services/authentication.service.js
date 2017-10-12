(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$http', '$localStorage', 'DataService'];
    function AuthenticationService($http, $localStorage, DataService) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(username, password, callback) {
            /*$http.post('http://localhost:3000/api/auth/login', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });*/
            $http.post('http://localhost:3000/api/auth/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {username: username, token: response.data.token};
                        DataService.set($localStorage.currentUser);
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;

                        // execute callback with true to indicate successful login
                        callback({success: true});
                    }
                },function (error) {
                    callback({success: false, message: error.data});
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            DataService.set('')
            $http.defaults.headers.common.Authorization = '';
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