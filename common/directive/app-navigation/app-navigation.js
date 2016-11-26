angular.module('kinder-app').directive('appNavigation', function ($rootScope, $location, TranslationService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'common/directive/app-navigation/app-navigation.html',
        link: function (scope, element, attrs, fn) {
            
            TranslationService.getTranslation(scope, 'tr');
            
            scope.currentMenuItem = "list-schools";

            var getCurrentMenuItem = function (currentPath) {
                if (currentPath.indexOf("list-schools") !== -1) {
                    return "list-schools";
                } else if (currentPath.indexOf("add-school") !== -1) {
                    return "add-school";
                } else if (currentPath.indexOf("update-school") !== -1) {
                    return "update-school";
                } else {
                    return "";
                }
			};
            
            scope.$on('$locationChangeSuccess', function(event, data) {
                scope.currentMenuItem = getCurrentMenuItem(data);
            });

            scope.currentMenuItem = getCurrentMenuItem($location.path());
        }
    };
});
