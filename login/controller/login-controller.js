angular
    .module('kinder-app')
    .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, Session) {
        $scope.credentials = {
            email: '',
            password: ''
        };
  
        $scope.login = function (credentials) {
            
            AuthService.login(credentials);
            
            $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {

                // do what you want to do
                console.log('login success.');
                console.log(Session.email);
            });
        };
});