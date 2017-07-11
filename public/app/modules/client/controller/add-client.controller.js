'use strict';
(function() {
  angular
    .module('clientApp')
    .controller('addClientController', controller);

  controller.$inject = ['ClientService', 'toastr', '$location', '$route'];

  function controller(ClientService, toastr, $location, $route) {
    let vm = this;
    vm.ClientService = ClientService;
    vm.addClient = addClient;
    activate();

    function activate() {}

    function addClient() {
      let sentUserId = $route.current.params.id;
      console.log("sentUserId", sentUserId);
      vm.sentUserId = sentUserId;
      let postObj = {
        companyName: vm.companyName,
        state: vm.state,
        city: vm.city,
        pincode: vm.pincode,
        email: vm.email,
        ownerName: vm.ownerName,
        address: vm.address,
        mobile1: vm.mobile1,
        mobile2: vm.mobile2,
        landline: vm.landline,
        panNo: vm.panNo,
        tinNo: vm.tinNo,
        GSTNo: vm.GSTNo,
        userId: vm.sentUserId

      };

      ClientService.addClient(postObj).then((response) => {
        toastr.success('Form saved Successfully');
      }).catch((error) => {
        toastr.error(error);
      });
      // $location.path('/products/list');
    }
  }
})();
