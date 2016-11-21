angular
    .module('kinder-app')
    .controller('AdminLoginCtrl', function($scope, $rootScope, $location, Auth, TranslationService) {

        TranslationService.getTranslation($scope, 'tr');

        $scope.checkLoginUser = function() {
            if (Auth.isLoggedIn()) {
                $location.path('/list-schools');
            }
        };

        $scope.adminLoginSubmit = function() {
            console.log($scope.email);
            console.log($scope.password);
            
            firebase.auth()
                .signInWithEmailAndPassword($scope.email, $scope.password)
                .then(function(user) {
                    Auth.setUser(user);
                    $location.path('/list-schools');
                }, function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("login failed errorCode: " + errorCode);
                    console.log("login failed errorMessage: " + errorMessage);
            });
        };
    
        $scope.checkLoginUser();
});
