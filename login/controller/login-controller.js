angular
    .module('kinder-app')
    .controller('LoginController', function ($scope, $rootScope, $rootScope, $location, AUTH_EVENTS, AuthService, Session) {

        console.log('login controller runs');

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.login = function (credentials) {
            AuthService.login(credentials);

            $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
                console.log('login success.');
                console.log(Session.email);
                console.log('redirect to list schoole from login controller 1')
                $location.path('/list-schools');
                $rootScope.safeApply();
            });
        };

        $scope.checkLoginAdminPage = function() {

            var lo = AuthService.isAuthenticated();

            if (AuthService.isAuthenticated()) {
                console.log('redirect to list schools from login 2');
                $location.path('/list-schools');
                $rootScope.safeApply();
            }
        };

        // $scope.checkLoginAdminPage();
});
