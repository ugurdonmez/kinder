angular
    .module('kinder-app')
    .controller('ApplicationController', function($scope, USER_ROLES, AuthService) {
        
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
 
        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };
});