angular
    .module('kinder-app')
    .controller('AdminLoginCtrl', function($scope, $rootScope, $location, TranslationService, UserService, AUTH_EVENTS) {

        TranslationService.getTranslation($scope, 'tr');

        this.checkAlreadyLogin = function() {
            if (UserService.isUserLoggedIn()) {
                $rootScope.safeApply();
            }
        };

        $scope.adminLoginSubmit = function() {
            UserService.login($scope.email, $scope.password);
        };
    
        $scope.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
            console.log('broadcast catch');
            $location.path("list-schools");
        });

        $scope.checkAlreadyLogin();
});
