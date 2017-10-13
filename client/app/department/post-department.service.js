(function () {
    'use strict';
    angular
        .module('app')
        .factory('PostDepartmentService', PostDepartmentService);
    PostDepartmentService.$inject = ['$modal', 'FlashService', 'DataService', 'DepartmentService', 'toaster'];
    function PostDepartmentService($modal, FlashService, DataService, DepartmentService, toaster) {
        var service = {};
        service.postItem = postItem;
        return service;

        function postItem() {
            $modal.open({
                templateUrl: 'department/post-department.view.html',
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
                DepartmentService.AddDepartment(vm.department, function (response) {
                    if(response){
                        DataService.setDa(true);
                        toaster.pop('sucess', "", "Department added");
                    }
                });
                $modalInstance.close();
            }
        }
    }
})();