angular
    .module('kinder-app')
    .factory('AuthService', function ($http, $rootScope, $location, Session, AUTH_EVENTS, CookieService, CookieSessionService) {

        var authService = {};

        authService.login = function (credentials) {

            firebase.auth()
                .signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(function(response) {

                    Session.create(response.email,
                                   response.uid,
                                   response.refreshToken,
                                   response.rd);

                    CookieSessionService.saveSessionToCookie();

                    console.log('AuthService: broadcast AUTH_EVENTS.loginSuccess');
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                },
                function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("login failed errorCode: " + errorCode);
                    console.log("login failed errorMessage: " + errorMessage);

                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };

        authService.isAuthenticated = function () {
            CookieSessionService.getSessionFromCookie();

            return (Session.uid !== '' && (typeof Session.uid !== "undefined"));
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        authService.logout = function() {
            service = this;

            firebase.auth()
                .signOut()
                .then(function() {
                    service.clearSessionKey();
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

                    console.log('AuthService: redirect login from auth service');
                    $location.path("/admin-login");

                    return;
                }, function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("login failed errorCode: " + errorCode);
                    console.log("login failed errorMessage: " + errorMessage);
                });
        };

        authService.clearSessionKey = function() {
            CookieSessionService.clearSessionCookie();

            Session.destroy();
        };

        return authService;
});
