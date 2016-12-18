angular
    .module('kinder-app')
    .controller('SchoolsListCtrl', function($scope, $rootScope, $location, SchoolService, TranslationService, AuthService) {

        console.log('school list run');

        TranslationService.getTranslation($scope, 'tr');

        $scope.initSchoolList = function() {

            SchoolService.getSchools().then(function(response){
                $scope.schools = response.val();
                $rootScope.safeApply();
            });
        };

        $scope.checkLoginSchoolList = function() {

            var lo = AuthService.isAuthenticated();

            if (!AuthService.isAuthenticated()) {
                console.log('SchoolList: redirect to login from school list');
                $location.path('/admin-login');
                $rootScope.safeApply();
            }
        };

        $scope.checkLoginSchoolList();
        $scope.initSchoolList();
});
