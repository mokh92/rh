(function() {
    'use strict';

    angular.module('app')
        .component('department', {
            templateUrl: 'department/department.view.html',
            bindings: {
                companyId: '<'
            },
            controller: ['DepartmentService', '$modal', 'ModalDeleteService', 'DataService', 'PostDepartmentService', 'CompanyService',
                function departmentController(DepartmentService, CompanyService, $modal, ModalDeleteService, DataService, PostDepartmentService) {
                var vm = this;
                vm.openDeleteModal = openDeleteModal;
                vm.openPostModal = openPostModal;
                vm.deleteDepartment = deleteDepartment;

                vm.$onInit = function () {
                    // Initialize companieId from DB
                    CompanyService.GetCompanies(function (response) {
                        vm.companyId = response[0]._id;
                    });

                    // Get departments from Db
                    DepartmentService.GetDepartments(vm.companyId , function (response) {
                        vm.departments = response;
                    });
                };

                // refresh after delete
                    vm.itemDeleted = DataService.getD();
                vm.subscription = DataService.subscribeD(function onNext(data) {
                    vm.itemDeleted = data;
                    if(data){
                        CompanyService.GetCompanies(function (response) {
                            vm.companies = response;
                        });
                        DataService.setD(false);
                    }
                });

                    // refresh after after add
                    vm.itemAdded = DataService.getDa();
                    vm.subscription = DataService.subscribeCa(function onNext(data) {
                        vm.itemAdded = data;
                        if(data){
                            CompanyService.GetCompanies(function (response) {
                                vm.companies = response;
                            });
                            DataService.setDa(false);
                        }
                    });

                vm.select= function(item){
                    vm.activeDepartment = item;
                };
                // pass the data to the delete modal service
                function openDeleteModal() {
                    ModalDeleteService.deleteItem(vm.activeCompany, vm.deleteDepartment);
                }
                function deleteDepartment(id, callback) {
                    var k = DepartmentService.DeleteDepartment(id, callback);
                }

                    // pass the data to the post modal service
                    function openPostModal() {
                        PostDepartmentService.postItem();
                    }

                    this.$onDestroy = function() {
                        vm.subscription.dispose();
                    };
            }]
        });
})();