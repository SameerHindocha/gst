'use strict';
(function () {
  angular
    .module('clientApp')
    .controller('addClientController', controller);

  controller.$inject = ['ClientService', 'toastr', '$location'];

  function controller(ClientService, toastr, $location) {

    let vm = this;
    vm.ClientService = ClientService;
    vm.addClient = addClient;
    activate();

    function activate() {}

    function addClient() {
      let postObj = {
        companyName: vm.companyName,
        state: vm.state,
        city: vm.city,
        pincode: vm.pincode,
        email: vm.email,
        address: vm.address,
        mobile1: vm.mobile1,
        mobile2: vm.mobile2,
        landline: vm.landline,
        panNo: vm.panNo,
        tinNo: vm.tinNo,
        gstNo: vm.gstNo
      };

      ClientService.addClient(postObj).then((response) => {
        toastr.success(response.result);
      }).catch((error) => {
        toastr.error(error);
      });
      // $location.path('/products/list');
    }
  }
})();
