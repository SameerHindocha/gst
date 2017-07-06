'use strict';
(function () {
  angular
    .module('userApp')
    .controller('listUserController', controller);

  controller.$inject = ['users', 'UserService', '$location', 'toastr', 'AuthService'];

  function controller(users, UserService, $location, toastr, AuthService) {
    let vm = this;
    vm.users = users;
    // vm.updateProduct = updateProduct;
    vm.Logout = Logout;

    // function deleteUser(_id) {

    //   AuthService.getLoginStatus().then((response) => {
    //     if (response.status === 200) {
    //       let deleteConfirm = confirm("Are you sure you want to delete this record...???");
    //       if (deleteConfirm == true) {
    //         let delObj = {
    //           _id: _id
    //         };
    //         ProductService.deleteProduct(delObj._id)
    //           .then((response) => {
    //             toastr.success(response.result);
    //             location.reload();
    //           }).catch((error) => {
    //             toastr.error(error);
    //           })
    //       }
    //     }
    //   }).catch((error) => {
    //     if (error.status === 401) {

    //       // $location.path(`/login`);
    //     }
    //   });
    // }

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

    // function updateProduct(_id) {
    //   console.log(_id);
    //   $location.path(`/products/edit/${_id}`);
    //   console.log("123");
    // }
  }
})();
