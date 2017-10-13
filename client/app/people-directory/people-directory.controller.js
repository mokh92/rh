(function () {
    'use strict';

    angular
        .module('app')
        .controller('PeopleDirectoryController', PeopleDirectoryController);

    PeopleDirectoryController.$inject = ['UserService', '$rootScope'];
    function PeopleDirectoryController(UserService, $rootScope) {
        this.company = '';

    }

})();