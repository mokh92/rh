(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ngStorage', 'rx', 'ui.bootstrap', 'toaster'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/people-directory', {
                controller: 'PeopleDirectoryController',
                templateUrl: 'people-directory/people-directory.view.html',
                controllerAs: 'vm'
            })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            .when('/jobs-manager', {
                controller: 'JobsManagerController',
                templateUrl: 'jobs-manager/jobs-manager.view.html',
                controllerAs: 'vm'
            })
            .when('/statistics', {
                controller: 'StatisticsController',
                templateUrl: 'statistics/statistics.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$localStorage', 'DataService'];
    function run($rootScope, $location, $cookies, $http, $localStorage, DataService) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }

})();