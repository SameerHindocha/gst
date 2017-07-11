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
    vm.sendSMS = sendSMS;
    vm.getClientList = getClientList;
    vm.Logout = Logout;
    activate();

    function activate() {

      console.log(" vm.currentUser", vm.currentUser);
      vm.currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
      vm.email = vm.currentUser.email;
      vm.getClientList();
    }

    function sendLink() {
      let postObj = {
        email: vm.email
      }
      DashboardService.shareLinkService(postObj);
      toastr.success("Email has been sent successfully to your mail");

    }

    function sendSMS() {
      let postObj = {
        email: vm.email
      }
      DashboardService.sendSMSService(postObj);
      toastr.success("SMS sent successfully");

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
      AuthService.logout().then((response) => {
        window.localStorage.removeItem('currentUser');
        toastr.success(response.data.message);
        $location.path(`/login`);
      }).catch((error) => {
        toastr.success(error);
      })
    }
  }


})();
