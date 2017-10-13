(function () {
    'use strict';

    angular.module('app')
        .factory('DataService', DataService);

    DataService.$inject = ['rx', '$localStorage'];
    function DataService(rx, $localStorage) {
        // header
        var subjectData = new rx.Subject();
        var data = $localStorage.currentUser;
        //company
            //delete
        var isDeleted = false;
        var subjectIsDeleted = new rx.Subject();
            //add
        var isAdded = false;
        var subjectIsAdded = new rx.Subject();

        //department
            //delete
        var departmentIsDeleted = false;
        var departmentSubjectIsDeleted = new rx.Subject();
            //add
        var departmentIsAdded = false;
        var departmentSubjectIsAdded = new rx.Subject();

        return {
            // header
            set: function set(d) {
                data = d;
                subjectData.onNext(d);
            },
            get: function get() {
                return data;
            },
            subscribe: function (o) {
                return subjectData.subscribe(o);
            },
            // company
                //delete
            setC: function set(d) {
                isDeleted = d;
                subjectIsDeleted.onNext(d);
            },
            getC: function get() {
                return isDeleted;
            },
            subscribeC: function (o) {
                return subjectIsDeleted.subscribe(o);
            },
                //add
            setCa: function set(d) {
                isAdded = d;
                subjectIsAdded.onNext(d);
            },
            getCa: function get() {
                return isAdded;
            },
            subscribeCa: function (o) {
                return subjectIsAdded.subscribe(o);
            },
            // department
                //delete
            setD: function set(d) {
                departmentIsDeleted = d;
                departmentSubjectIsDeleted.onNext(d);
            },
            getD: function get() {
                return departmentIsDeleted;
            },
            subscribeD: function (o) {
                return subjectIsDeleted.subscribe(o);
            },
                //add
            setDa: function set(d) {
                departmentIsAdded = d;
                departmentSubjectIsAdded.onNext(d);
            },
            getDa: function get() {
                return departmentIsAdded;
            },
            subscribeDa: function (o) {
                return departmentSubjectIsAdded.subscribe(o);
            }

        }
    }
})();
