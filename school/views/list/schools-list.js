angular
    .module('kinder-app')
    .controller('SchoolsListCtrl', function($scope, $rootScope, $location, SchoolService, TranslationService, UserService) {

        TranslationService.getTranslation($scope, 'tr');
    
        $scope.checkLogin = function() {
            if (!UserService.isUserLoggedIn()) {
                $location.path('/admin-login');
                $rootScope.safeApply();
            }
        };
    
        $scope.init = function() {

            SchoolService.getSchools().then(function(response){
                $scope.schools = response.val();
                $rootScope.safeApply();
            });
        };

        $scope.init();
    
        $scope.checkLogin();
});
