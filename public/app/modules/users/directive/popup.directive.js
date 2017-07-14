'use strict';
(function() {
  angular
    .module('userApp')
    .directive('popupInfo', directive);
  directive.inject = ['$scope'];

  function directive() {

    return {

      scope: {
        data: '=',
        onUpdate: '&'
      },
      templateUrl: "app/modules/users/view/popup.html",
      transclude: true,

      controller: ['$scope', function($scope) {
        $scope.states = ["Andaman and Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "West Bengal", "Chhattisgarh", "Uttarakhand", "Jharkhand", "Telangana"]

        $scope.details = angular.copy($scope.data);

        $scope.openAddPopup = function() {
          $('#myModal').modal('show');
          $scope.directiveCtrlCalled = true;
        };

        $scope.send = function() {
          $scope.onUpdate({ details: $scope.details })
        }
      }],

      link: function($scope, attr, elem) {}
    }
  }
})();
