'use strict';
(function() {
  angular
    .module('clientApp')
    .controller('dashboardController', controller);

  controller.$inject = ['DashboardService', 'AuthService', 'toastr', '$location', 'lodash'];

  function controller(DashboardService, AuthService, toastr, $location, lodash) {
    let vm = this;
    vm.DashboardService = DashboardService;
    vm.sendLink = sendLink;
    vm.sendSMS = sendSMS;
    vm.getClientList = getClientList;
    vm.Logout = Logout;
    vm.search = search;
    vm.link = JSON.parse(localStorage.getItem('currentUser')).preLink + '/' + JSON.parse(localStorage.getItem('currentUser'))._id;
    vm.searchText = '';
    vm.fullData = [];
    // vm.updateVal = updateVal;
    // $(".inner, .inner2").dblclick(function(e) {
    //   e.stopPropagation();
    //   var currentEle = $(this);
    //   var value = $(this).html();
    //   updateVal(currentEle, value);
    // });


    // function updateVal(currentEle, value) {
    //   $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
    //   $(".thVal").focus();
    //   $(".thVal").keyup(function(event) {
    //     if (event.keyCode == 13) {
    //       $(currentEle).html($(".thVal").val().trim());
    //     }
    //   });

    //   $(document).click(function() {
    //     $(currentEle).html($(".thVal").val().trim());
    //   });
    // }





    activate();

    function activate() {
      vm.getCurrentUserForEmail = JSON.parse(window.localStorage.getItem('currentUser'));
      vm.email = vm.getCurrentUserForEmail.email;
      vm.companyName = vm.getCurrentUserForEmail.companyName;

      vm.getClientList();
    }

    function sendLink() {
      let postObj = {
        email: vm.email
      }
      DashboardService.shareLinkService(postObj).then((response) => {
        toastr.success(response.data.message);
      }).catch((error) => {
        toastr.error("Error in Sending E-mail");
      })
    }

    function sendSMS() {
      let postObj = {
        email: vm.email
      }
      DashboardService.sendSMSService(postObj);
      toastr.success("SMS sent successfully");
      // toastr.error("Error in Sending SMS ");
    }

    function getClientList() {
      let postObj = {
        email: vm.email
      }
      DashboardService.getClients(postObj).then((response) => {
        vm.clients = response.data;
        vm.clientListResponse = response.data;
      }).catch((error) => {
        toastr.error("Error in getting Client List");
      })
    }

    function Logout() {
      AuthService.logout().then((response) => {
        window.localStorage.removeItem('currentUser');
        toastr.success(response.data.message);
        $location.path('/login');
      }).catch((error) => {
        toastr.error("Error logging out");
      })
    }

    function search() {
      function searchUtil(item, toSearch) {
        return (item.companyName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.GSTNo.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) ? true : false;
      }
      const totalClients = vm.clientListResponse; //clientListResponse is the client list got from response in getClientList()
      if (vm.searchtext == '') {
        vm.clients = vm.clientListResponse;
      } else {
        vm.filteredList = lodash.filter(totalClients,
          function(item) {
            return searchUtil(item, vm.searchText);
          });
        vm.clients = vm.filteredList;
      }
    }

  }


})();
