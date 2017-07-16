'use strict';
(function() {
  angular
    .module('clientApp')
    .factory('ClientService', Service);

  Service.$inject = ['$http', '$q'];

  function Service($http, $q) {
    return {
      addClient: addClient,
      gstStatus: gstStatus
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

    function gstStatus(data) {
      let defer = $q.defer();
      $http({
        method: 'get',
        url: '/api/gst-status/' + data.userKey
      }).then(function(response) {
        defer.resolve(response);
      }).catch(function(error) {
        defer.reject(error);
      });
      return defer.promise;
    }

  }
})();
