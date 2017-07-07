'use strict';
(function() {
  angular
    .module('userApp')
    // .factory('httpInterceptor',httpInterceptor)
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider

        .when("/user/list", {
        templateUrl: 'app/modules/users/view/list-user.html',
        controller: 'listUserController',
        controllerAs: 'vm',
        resolve: {
          'users': ['$location', 'UserService', function($location, UserService) {

            return UserService.listUser();
            //  .then(()=>{

            //     return ProductService.listProduct();
            // }).catch(()=>{
            //     return $location.path('/login');

            // });

          }]
        },
      })

      .when("/user/add", {
        templateUrl: 'app/modules/users/view/add-user.html',
        controller: 'addUserController',
        controllerAs: 'vm'


      })

      // .when("/user/edit/:id", {
      //   templateUrl: 'app/modules/users/view/edit-user.html',
      //   controller: 'editUserController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     'UserDetail': ['UserService', '$route', '$location', function(UserService, $route, $location) {

      //       return UserService.getUserById($route.current.params.id);
      //     }]
      //   },
      // })

      .otherwise({
        redirectTo: '/user/list'
      });
    }]);



})();
