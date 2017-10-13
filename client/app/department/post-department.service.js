(function () {
    'use strict';
    angular
        .module('app')
        .factory('PostDepartmentService', PostDepartmentService);
    PostDepartmentService.$inject = ['$modal', 'DataService', 'DepartmentService', 'toaster', 'CompanyService'];
    function PostDepartmentService($modal, DataService, DepartmentService, toaster, CompanyService) {

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
            (function initController() {
                // reset login status
                ListCompanies();
            })();
            vm.AddDepartment = AddDepartment;
            vm.ListCompanies = ListCompanies;

            function ListCompanies() {
                CompanyService.GetCompanies(function (response) {
                   vm.companies = response.map(function (company) {
                       return {_id: company._id, name: company.name};
                   });
                });
            }

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