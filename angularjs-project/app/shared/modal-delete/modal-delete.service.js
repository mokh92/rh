(function () {
    'use strict';
    angular
        .module('app')
        .factory('ModalDeleteService', ModalDeleteService);
    ModalDeleteService.$inject = ['$modal', 'FlashService', 'DataService'];
    function ModalDeleteService($modal, FlashService, DataService) {
        var service = {};
        service.deleteItem = deleteItem;
        return service;

        function deleteItem(item, fn) {
            $modal.open({
                templateUrl: 'shared/model-delete/modal-delete.html',
                controller: ['$modalInstance', 'item', 'fn', DeleteModalCtrl],
                controllerAs: 'vm',
                resolve: {
                    fn: function () {return fn},
                    item: function () { return item }
                }

            });

        }

        function DeleteModalCtrl($modalInstance, item, fn) {
            var vm = this;

            vm.item = item;
            vm.fn = fn;
            vm.deleteItem = deleteItem;

            function deleteItem() {
                vm.fn(item, function (response) {
                    if(response == 'success'){
                        DataService.setC(true);
                        DataService.setD(true);
                        FlashService.Success('Item deleted', true);
                    }
                });
                $modalInstance.close();
            }
        }
    }
})();