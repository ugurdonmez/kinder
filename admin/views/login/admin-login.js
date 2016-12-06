angular
    .module('kinder-app')
    .controller('AdminLoginCtrl', function($scope, $rootScope, $location, TranslationService, UserService) {

        TranslationService.getTranslation($scope, 'tr');

        this.checkAlreadyLogin = function() {
            if (UserService.isUserLoggedIn()) {
                $location.path('/list-schools');
                $rootScope.safeApply();
            }
        };

        $scope.adminLoginSubmit = function() {
            console.log($scope.email);
            console.log($scope.password);

            UserService.login($scope.email, $scope.password);
            $scope.checkAlreadyLogin();
        };

        $scope.checkAlreadyLogin();
});
