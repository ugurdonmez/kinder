angular
    .module('kinder-app')
    .controller('AdminLoginCtrl', function($scope, $rootScope, $location, TranslationService, UserService) {

        TranslationService.getTranslation($scope, 'tr');

        $scope.adminLoginSubmit = function() {
            console.log($scope.email);
            console.log($scope.password);
            
            firebase.auth()
                .signInWithEmailAndPassword($scope.email, $scope.password)
                .then(function(user) {
                    $location.path('/list-schools');
                }, function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("login failed errorCode: " + errorCode);
                    console.log("login failed errorMessage: " + errorMessage);
            });
        };
});
