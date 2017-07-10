angular.module('mainApp')
    .directive('header', headerDirective)

function headerDirective() {
    return {
        templateUrl: '/app/header/header.html'
    }
}
