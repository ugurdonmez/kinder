angular
    .module('kinder-app')
    .controller('SchoolAddCtrl', function($scope, ,$rootScope, $location, SchoolService, TranslationService, UserService) {

        $scope.school = new School();
        $scope.school.isActivated = false;

        TranslationService.getTranslation($scope, 'tr');
    
        $scope.checkLogin = function() {
            if (!UserService.isUserLoggedIn()) {
                $location.path('/admin-login');
                $rootScope.safeApply();
            }
        };

        $scope.addSchool = function() {

            /*
            image upload

            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child('mountains.jpg');

            var file = $scope.s3file;
            mountainsRef.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
            });
            */

            SchoolService.addSchool($scope.school);
        };

        $scope.init = function() {

        };

        $scope.uploadLogo = function() {

        };

        $scope.init();
        
        $scope.checkLogin();
});
