angular
    .module('kinder-app')
    .factory('AuthService', function ($http, $rootScope, Session, AUTH_EVENTS) {
        
        var authService = {};
 
        authService.login = function (credentials) {
            
            firebase.auth()
                .signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(function(response) {
                    
                    Session.create(response.email,
                                   response.uid,
                                   response.refreshToken,
                                   response.rd);
                    
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                
                    // return response.email;
            
                }
                , function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("login failed errorCode: " + errorCode);
                    console.log("login failed errorMessage: " + errorMessage);
                
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
            
            // return Session.email;
        };
 
        authService.isAuthenticated = function () {
            return !!Session.userId;
        };
 
        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        };
 
        return authService;
});