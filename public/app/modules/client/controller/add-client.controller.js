'use strict';
(function() {
    angular
        .module('clientApp')
        .controller('addClientController', controller);

    controller.$inject = ['ClientService', 'toastr', '$location', '$route'];

    function controller(ClientService, toastr, $location, $route) {
        console.log("123");
        let vm = this;
        vm.ClientService = ClientService;
        vm.addClient = addClient;
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
                address: vm.address,
                mobile1: vm.mobile1,
                mobile2: vm.mobile2,
                landline: vm.landline,
                panNo: vm.panNo,
                tinNo: vm.tinNo,
                gstNo: vm.gstNo,
                User: vm.sentUserId
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
