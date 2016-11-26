angular.module('kinder-app').service('CookieSessionService', function (CookieService, Session) {
    
    this.saveSessionToCookie = function() {
        CookieService.addToCookie('email', Session.email);
        CookieService.addToCookie('uid', Session.uid);
        CookieService.addToCookie('refreshToken', Session.refreshToken);
        CookieService.addToCookie('rd', Session.rd);
    };
    
    this.clearSessionCookie = function() {
        CookieService.deleteFromCookie('email');
        CookieService.deleteFromCookie('uid');
        CookieService.deleteFromCookie('refreshToken');
        CookieService.deleteFromCookie('rd');
    };
    
    this.getSessionFromCookie = function() {
        Session.create(CookieService.getFromCookie('email'),
                       CookieService.getFromCookie('uid'),
                       CookieService.getFromCookie('refreshToken'),
                       CookieService.getFromCookie('rd'));
    };

});
