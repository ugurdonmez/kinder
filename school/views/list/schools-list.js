angular
    .module('kinder-app')
    .controller('SchoolsListCtrl', function($scope, $rootScope, SchoolService, TranslationService) {

        TranslationService.getTranslation($scope, 'tr');

        $scope.init = function() {

            SchoolService.getSchools().then(function(response){
                $scope.schools = response.val();
                $rootScope.safeApply();
            });
        };

        $scope.init();
});
