angular
    .module('kinder-app')
    .controller('SchoolUpdateCtrl', function($scope, $routeParams, SchoolService, TranslationService) {

        $scope.schoolId = $routeParams.schoolId;
        $scope.school = new School();
        $scope.school.isActivated = true;

        TranslationService.getTranslation($scope, 'tr');

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
