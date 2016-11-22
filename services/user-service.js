angular.module('kinder-app').service('UserService', function ($rootScope, $location, $timeout, CookieService, AUTH_EVENTS) {
    
    var _userData = {
        "loginEmail": CookieService.getFromCookie("email"),
        "loginUid": CookieService.getFromCookie("uid"),
        "loginRefreshToken": CookieService.getFromCookie("refreshToken"),
        "loginRD": CookieService.getFromCookie("rd")
    };
    
    this.login = function (email, password) {
        
        firebase.auth()
                .signInWithEmailAndPassword($scope.email, $scope.password)
                .then(function(response) {
            
                    _userData.loginEmail = response.email;
                    _userData.loginUid = response.uid;
                    _userData.loginRefreshToken = response.refreshToken;
                    _userData.loginRD = response.rd;

                    CookieService.addToCookie("email", _userData.loginEmail);
                    CookieService.addToCookie("uid", _userData.loginUid);
                    CookieService.addToCookie("refreshToken", _userData.loginRefreshToken);
                    CookieService.addToCookie("rd", _userData.loginRD);
                    
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            
                    $rootScope.$apply();
            
                    return;
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
        return (_userData.loginRefreshToken !== '' && (typeof _userData.loginRefreshToken !== "undefined"));
    };
    
    this.clearSessionKey = function () {
        CookieService.deleteFromCookie("email");
        CookieService.deleteFromCookie("uid");
        CookieService.deleteFromCookie("refreshToken");
        CookieService.deleteFromCookie("rd");

        _userData = {};
    };
    
});
