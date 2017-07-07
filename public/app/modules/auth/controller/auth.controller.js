'use strict';
(function() {
    angular
        .module('authApp')
        .controller('AuthController', controller);

    controller.$inject = ['AuthService', '$location', 'toastr'];

    function controller(AuthService, $location, toastr) {

        let vm = this;
        vm.AuthService = AuthService;
        vm.doLogin = doLogin;
        vm.register = register;
        activate();

        function activate() {
            AuthService.getLoginStatus().then((response) => {
                if (response.status === 200) {
                    toastr.success(response.data.message);
                    $location.path('/dashboard');
                }
            }).catch((error) => {
                toastr.error(error.data.message);
            })
        }


        function doLogin() {
            let postObj = {
                Email: vm.data1,
                Password: vm.data2
            };
            AuthService.Login(postObj).then((response) => {
                window.localStorage.setItem('session', vm.data1);
                toastr.success(response.data.message);
                $location.path('/dashboard');
            }).catch((Error) => {
                console.log(Error);
                vm.error = Error.data.message;
            });
        }

        function register() {
            $location.path('/user/add');
        }
    }
})();