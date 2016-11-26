angular
    .module('kinder-app')
    .controller('LoginController', function ($scope, $rootScope, $rootScope, $location, AUTH_EVENTS, AuthService, Session, CookieService, CookieSessionService) {
        $scope.credentials = {
            email: '',
            password: ''
        };
  
        $scope.login = function (credentials) {          
            AuthService.login(credentials);
            
            $scope.$on(AUTH_EVENTS.loginSuccess, function(event, args) {
                console.log('login success.');
                console.log(Session.email);
                $location.path('/list-schools');
                $rootScope.safeApply();
            });
        };
    
        $scope.checkLogin = function() {
            
            CookieSessionService.getSessionFromCookie();
            
            if (AuthService.isAuthenticated()) {
                $location.path('/list-schools');
                $rootScope.safeApply();
            }  
        };
    
        $scope.checkLogin();
});