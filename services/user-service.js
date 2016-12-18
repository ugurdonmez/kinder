angular.module('kinder-app').service('UserService', function ($rootScope, $location, $timeout, CookieService, AUTH_EVENTS, CookieSessionService, Session) {

    var _userData = {
        "loginEmail": CookieService.getFromCookie("email"),
        "loginUid": CookieService.getFromCookie("uid"),
        "loginRefreshToken": CookieService.getFromCookie("refreshToken"),
        "loginRD": CookieService.getFromCookie("rd")
    };

    this.login = function (credentials) {

        firebase.auth()
                .signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(function(response) {

                    _userData.loginEmail = response.email;
                    _userData.loginUid = response.uid;
                    _userData.loginRefreshToken = response.refreshToken;
                    _userData.loginRD = response.rd;
            
                    Session.create(response.email,
                                   response.uid,
                                   response.refreshToken,
                                   response.rd);

                    CookieSessionService.saveSessionToCookie();
                    $location.path('/list-schools');

                    // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

                }, function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("login failed errorCode: " + errorCode);
                    console.log("login failed errorMessage: " + errorMessage);
            });
    };

    this.logout = function () {

        service = this;

        firebase.auth()
            .signOut()
            .then(function() {
                service.clearSessionKey();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

                $timeout(function(){
                    $location.url("login");
                }, 1);

                return;
            }, function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("login failed errorCode: " + errorCode);
                console.log("login failed errorMessage: " + errorMessage);
            });

    };


    this.isUserLoggedIn = function () {
        
        CookieSessionService.getSessionFromCookie();
        
        return !Session.uid;
        
        // return (_userData.loginRefreshToken !== '' && (typeof _userData.loginRefreshToken !== "undefined"));
    };

    this.clearSessionKey = function () {
        
        CookieSessionService.clearSessionCookie();
        
        Session.destroy();

        _userData = {};
    };

});
