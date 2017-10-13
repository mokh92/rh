(function() {
    'use strict';

    angular.module('app')
        .component('company', {
            templateUrl: 'company/company.view.html',
            bindings: {
                onCompanyChange: '&'
            },
            controller: ['CompanyService', '$modal', 'ModalDeleteService', 'DataService', 'PostCompanyService',
                function companyController(CompanyService, $modal, ModalDeleteService, DataService, PostCompanyService) {
                var vm = this;
                vm.openDeleteModal = openDeleteModal;
                vm.openPostModal = openPostModal;
                vm.deleteCompany = deleteCompany;

                // get companies from DB
                vm.$onInit = function () {
                    CompanyService.GetCompanies(function (response) {
                        vm.companies = response;
                        console.log(vm.companies);
                        vm.company = {_id: response[0]._id, name: response[0].name};
                    });
                };

                // refresh after after delete
                    vm.itemDeleted = DataService.getC();
                vm.subscription = DataService.subscribeC(function onNext(data) {
                    vm.itemDeleted = data;
                    if(data){
                        CompanyService.GetCompanies(function (response) {
                            vm.companies = response;
                        });
                        DataService.setC(false);
                    }
                });

                    // refresh after after add
                    vm.itemAdded = DataService.getCa();
                    vm.subscription = DataService.subscribeCa(function onNext(data) {
                        vm.itemAdded = data;
                        if(data){
                            CompanyService.GetCompanies(function (response) {
                                vm.companies = response;
                            });
                            DataService.setCa(false);
                        }
                    });

                vm.select= function(item){
                    vm.activeCompany = item;
                    vm.company = item;
                    vm.onCompanyChange({$event: {company: item}});
                };
                // pass the data to the delete modal service
                function openDeleteModal() {
                    ModalDeleteService.deleteItem(vm.activeCompany, vm.deleteCompany);
                }
                function deleteCompany(id, callback) {
                    var k = CompanyService.DeleteCompany(id, callback);
                }

                    // pass the data to the post modal service
                    function openPostModal() {
                        PostCompanyService.postItem();
                    }

                    this.$onDestroy = function() {
                        vm.subscription.dispose();
                    };
            }]
        });
})();