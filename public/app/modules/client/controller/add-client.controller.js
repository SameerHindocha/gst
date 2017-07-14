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
    vm.states = ["Andaman and Nicobar ", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "West Bengal", "Chhattisgarh", "Uttarakhand", "Jharkhand", "Telangana"]
    activate();

    function activate() {}

    function addClient() {
      let sentUserId = $route.current.params.id;
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
        GSTNo: vm.GSTNo,
        userId: vm.sentUserId,
        password: vm.password
      };

      if (vm.password != vm.confirmPassword) {
        toastr.error('Confirm password must match the entered password');
      } else {
        ClientService.addClient(postObj).then((response) => {
          toastr.success('Registered successfully');
          if (vm.password) {
            $location.path('/login')
          } else {
            $location.path('/client/post-register')
          }
        }).catch((error) => {
          if (error.status == 409) {
            toastr.error(error.data.message);
          }
        });
      }
    }
  }
})();
