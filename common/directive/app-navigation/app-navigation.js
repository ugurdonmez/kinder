angular.module('kinder-app').directive('appNavigation', function ($rootScope, $location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'common/directive/app-navigation/app-navigation.html',
        link: function (scope, element, attrs, fn) {
        }
    };
});
