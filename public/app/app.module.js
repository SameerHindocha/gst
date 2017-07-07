angular
    .module('mainApp', ['userApp', 'clientApp', 'authApp', 'dashboardApp', 'ngRoute'])
    .config(config)
    .run(run)
    .factory('httpInterceptor', httpInterceptor);


config.$inject = ['$routeProvider', '$httpProvider'];
run.$inject = ['$rootScope', '$route', '$location'];
httpInterceptor.$inject = ['$timeout', '$q', '$location', '$injector', 'toastr'];

function config($routeProvider, $httpProvider) {

    $routeProvider.otherwise({ redirectTo: '/login' });
    $httpProvider.interceptors.push('httpInterceptor');
}


function run($rootScope, $route, $location) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (window.localStorage.getItem('session') && !next.$$route.loggedInGuard) {
            console.log("Session = True & LoginGuard = False");
            return $location.path('/dashboard');
        } else if (window.localStorage.getItem('session') && next.$$route.loggedInGuard) {
            console.log("Session = True & LoginGuard = True");
            return $location.path(next.$$route.originalPath);
        } else if (window.localStorage.getItem('session') == null && !next.$$route.loggedInGuard) {

            console.log("Session = False & LoginGuard = False");
            // return $location.path(next.$$route.originalPath);
        } else {
            return $location.path('/login');
        }
        return;
    });
}

function httpInterceptor($timeout, $q, $location, $injector, toastr) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },
        response: function(result) {
            // if (window.localStorage.getItem('session') && window.location.href == 'http://localhost:8020/#/login') {
            //     // $location.path('/user/list');
            // }
            return result || $q.when(result);
        },
        responseError: function(response) {
            if (response.status === 401 || response.status === 500) {
                return $location.path('/login')
            }
            return $q.reject(response);
        }
    }
};
