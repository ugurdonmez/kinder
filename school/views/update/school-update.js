angular
    .module('kinder-app')
    .controller('SchoolUpdateCtrl', function($scope, $rootScope, $location, $routeParams, $rootScope, SchoolService, TranslationService, UserService) {

        $scope.schoolId = $routeParams.schoolId;

        TranslationService.getTranslation($scope, 'tr');
    
        $scope.checkLogin = function() {
            if (!UserService.isUserLoggedIn()) {
                $location.path('/admin-login');
                $rootScope.safeApply();
            }
        };

        $scope.updateSchool = function() {
            SchoolService.updateSchool($scope.schoolId, $scope.school);
            $scope.init();
        };

        $scope.init = function() {
            SchoolService.getSchool($scope.schoolId).then(function(response){
                $scope.school = response.val();
                $scope.school.membershipStart = new Date($scope.school.membershipStart);
                $scope.school.membershipEnd = new Date($scope.school.membershipEnd);
                $rootScope.safeApply();
            });
        };

        $scope.uploadLogo = function() {

        };

        $scope.init();
        
        $scope.checkLogin();
});
