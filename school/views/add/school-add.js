angular
    .module('kinder-app')
    .controller('SchoolAddCtrl', function($scope, SchoolService, TranslationService) {

        $scope.school = new School();
        $scope.school.isActivated = true;

        $scope.translation = TranslationService.getTranslation($scope, 'tr');

        $scope.addSchool = function() {

            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child('mountains.jpg');

            var file = $scope.s3file;
            mountainsRef.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
            });

            SchoolService.addSchool($scope.school);
        };

        $scope.init = function() {

        };

        $scope.uploadLogo = function() {

        };

        $scope.init();

});
