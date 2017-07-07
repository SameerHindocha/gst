'use strict';
(function() {
    angular
        .module('clientApp')
        .controller('dashboardController', controller);

    controller.$inject = ['DashboardService', 'AuthService', 'toastr', '$location'];

    function controller(DashboardService, AuthService, toastr, $location) {

        let vm = this;
        vm.DashboardService = DashboardService;
        vm.sendLink = sendLink;
        vm.getClientList = getClientList;
        vm.Logout = Logout;
        activate();

        function activate() {
            vm.email = localStorage.session;
            vm.getClientList();
        }

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

        function getClientList() {
            let postObj = {
                email: vm.email
            }
            DashboardService.getClients(postObj).then((response) => {
                vm.clients = response.data;
            }).catch((error) => {
                console.log(error);
            })
        }

        function Logout() {
            console.log("here");
            AuthService.logout().then((response) => {
                window.localStorage.removeItem('session');
                toastr.success(response.data.message);
                $location.path(`/login`);
            }).catch((error) => {
                toastr.success(error);
            })
        }
    }


})();
