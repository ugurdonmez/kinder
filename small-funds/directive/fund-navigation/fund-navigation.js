angular.module('data-explorer').directive('smallFundNavigation', function ($rootScope, $location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            fund: "=fund"
        },
        templateUrl: 'small-funds/directive/fund-navigation/fund-navigation.html',
        link: function (scope, element, attrs, fn) {

            var getCurrentMenuItem = function (currentPath) {
                if (currentPath.indexOf("holding") !== -1) {
                    return "holdings";
                } else if (currentPath.indexOf("13f-filings") !== -1) {
                    return "13f-filings";
                }
                else {
                    return "information";
                }
            };

            scope.$on('$locationChangeSuccess', function(event, data) {
                scope.currentMenuItem = getCurrentMenuItem(data);
            });

            scope.currentMenuItem = getCurrentMenuItem($location.path());

        }
    };
});
