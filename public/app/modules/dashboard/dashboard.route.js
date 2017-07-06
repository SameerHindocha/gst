'use strict';
(function() {
    angular
        .module('dashboardApp')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when("/dashboard", {
                    templateUrl: 'app/modules/dashboard/view/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                })
        }]);
})();
