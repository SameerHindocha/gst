'use strict';
(function() {
    angular
        .module('clientApp')
        .factory('ClientService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        return {
            addClient: addClient,

        };

        function addClient(data) {
            var defer = $q.defer();
            $http({
                method: 'post',
                url: '/api/client',
                data: data
            }).then(function(response) {
                defer.resolve(response);
            }).catch(function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }
    }
})();
