'use strict';
(function() {
    angular
        .module('clientApp')
        .controller('dashboardController', controller);

    controller.$inject = ['DashboardService', 'toastr', '$location'];

    function controller(DashboardService, toastr, $location) {

        let vm = this;
        vm.DashboardService = DashboardService;
        vm.sendLink = sendLink;
        activate();

        function activate() {}

        function sendLink() {
            let postObj = {
                email: vm.email
            }


            DashboardService.shareLinkService(postObj).then((response) => {
                toastr.success(response);
            }).catch((error) => {
                toastr.error(error);
            });
        }
    }
})();
