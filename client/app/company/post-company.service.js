(function () {
    'use strict';
    angular
        .module('app')
        .factory('PostCompanyService', PostCompanyService);
    PostCompanyService.$inject = ['$modal', 'FlashService', 'DataService', 'CompanyService'];
    function PostCompanyService($modal, FlashService, DataService, CompanyService) {
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
                    }
                });
                $modalInstance.close();
            }
        }
    }
})();