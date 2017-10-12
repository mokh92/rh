(function () {
    'use strict';
    angular
        .module('app')
        .factory('PostDepartmentService', PostDepartmentService);
    PostDepartmentService.$inject = ['$modal', 'FlashService', 'DataService', 'DepartmentService'];
    function PostDepartmentService($modal, FlashService, DataService, DepartmentService) {
        var service = {};
        service.postItem = postItem;
        return service;

        function postItem() {
            $modal.open({
                templateUrl: 'company/post-department.view.html',
                controller: ['$modalInstance', PostModalCtrl],
                controllerAs: 'vm',
                resolve: {
                }

            });
        }

        function PostModalCtrl($modalInstance) {
            var vm = this;
            vm.AddDepartment = AddDepartment;

            function AddDepartment() {
                DepartmentService.AddDepartment(vm.Department, function (response) {
                    if(response){
                        DataService.setDa(true);
                    }
                });
                $modalInstance.close();
            }
        }
    }
})();