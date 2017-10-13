(function() {
    'use strict';

    angular
        .module('app')
        .component('header', {
            templateUrl: 'header/header.view.html',
            controller: ['$localStorage', 'DataService', function HeaderController($localStorage, DataService) {
                var vm = this;
                vm.activeModule = 'people-directory'
                // get user informations
                vm.data = DataService.get();
                 var subscription = DataService.subscribe(function onNext(data) {
                    vm.data = data;
                     if(vm.data.username){
                         vm.user = vm.data;
                     }else if(!vm.data.username){
                         vm.user = '';
                     }
                });
                vm.user = vm.data;
                // active module
                vm.select = function (item) {
                    vm.activeModule = item;
                };

                this.$onDestroy = function() {
                    vm.subscription.dispose();
                };
            }]
        });
})();
