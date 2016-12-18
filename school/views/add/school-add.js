angular
    .module('kinder-app')
    .controller('SchoolAddCtrl', function($scope, $rootScope, $location, SchoolService, TranslationService, CookieSessionService, AuthService) {

        console.log('school add run');

        $scope.checkLoginSchoolAdd = function() {

            var lo = AuthService.isAuthenticated();

            if (!AuthService.isAuthenticated()) {
                console.log('SchooAdd: redirect to login');
                $location.path('/admin-login');
                $rootScope.safeApply();
            }
        };

        $scope.addSchool = function() {
            $scope.school.logoURL = '';
            SchoolService.addSchool($scope.school);
        };

        $scope.checkLoginSchoolAdd();

        $scope.school = new School();
        $scope.school.isActivated = false;

        TranslationService.getTranslation($scope, 'tr');
});
