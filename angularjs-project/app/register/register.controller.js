(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.user) {
                        console.log(response.user)
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        console.log(response.message.error)
                        FlashService.Error(response.message.error);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
