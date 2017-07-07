'use strict';
(function() {
  angular
    .module('userApp')
    .controller('addUserController', controller);

  controller.$inject = ['UserService', 'toastr', '$location'];

  function controller(UserService, toastr, $location) {

    let vm = this;
    vm.UserService = UserService;
    vm.addUser = addUser;
    activate();

    function activate() {}

    function addUser() {
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
        password: vm.password
      };

      UserService.addUser(postObj).then((response) => {
        toastr.success(response.result);
      }).catch((error) => {
        toastr.error(error);
      });
      // $location.path('/products/list');
    }
  }
})();
