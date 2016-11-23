angular
    .module('kinder-app')
    .service('Session', function () {
        
        this.create = function (email, uid, refreshToken, rd) {
            this.email = email;
            this.uid = uid;
            this.refreshToken = refreshToken;
            this.rd = rd;
        };
  
        this.destroy = function () {
            this.email = null;
            this.uid = null;
            this.refreshToken = null;
            this.rd = null;
        };
});