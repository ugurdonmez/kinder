angular
    .module('kinder-app')
    .controller('AdminSignUpCtrl', function($scope, $rootScope, TranslationService) {

        TranslationService.getTranslation($scope, 'tr');

        $scope.adminSignupSubmit = function() {
            console.log($scope.email);
            console.log($scope.password);

            firebase.auth()
                .createUserWithEmailAndPassword($scope.email, $scope.password)
                .catch(function(err){
                    var errorCode = err.code;
                    var errorMessage = error.message;
                    console.log("ERROR");
                    console.log(errorCode, errorMessage);

                    // TODO: redirect to login page
            });
        };
});
