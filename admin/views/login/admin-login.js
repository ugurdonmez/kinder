angular
    .module('kinder-app')
    .controller('AdminLoginCtrl', function($scope, $rootScope, TranslationService) {

        TranslationService.getTranslation($scope, 'tr');

        $scope.adminLoginSubmit = function() {
            console.log($scope.email);
            console.log($scope.password);
            
        
        };
});
