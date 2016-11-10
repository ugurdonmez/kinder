angular.module('data-explorer').directive('smallFundsNavigation', function ($rootScope, $location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            fund: "=fund"
        },
        templateUrl: 'small-funds/directive/funds-navigation/funds-navigation.html',
        link: function (scope, element, attrs, fn) {

            var getCurrentMenuItem = function (currentPath) {
                return "browse";
            };

            scope.$on('$locationChangeSuccess', function(event, data) {
                scope.currentMenuItem = getCurrentMenuItem(data);
            });

            scope.currentMenuItem = getCurrentMenuItem($location.path());

        }
    };
});
