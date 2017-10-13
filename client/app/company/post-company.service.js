(function () {
    'use strict';
    angular
        .module('app')
        .factory('PostCompanyService', PostCompanyService);
    PostCompanyService.$inject = ['$modal', 'DataService', 'CompanyService', 'toaster'];
    function PostCompanyService($modal, DataService, CompanyService, toaster) {
        var service = {};
        service.postItem = postItem;
        return service;

        function postItem() {
            $modal.open({
                templateUrl: 'company/post-company.view.html',
                controller: ['$modalInstance', PostModalCtrl],
                controllerAs: 'vm',
                resolve: {
                }

            });
        }

        function PostModalCtrl($modalInstance) {
            var vm = this;
            vm.AddCompany = AddCompany;

            function AddCompany() {
                CompanyService.AddCompany(vm.company, function (response) {
                    if(response){
                        DataService.setCa(true);
                        toaster.pop('sucess', "", "Company added");
                    }
                });
                $modalInstance.close();
            }
        }
    }
})();