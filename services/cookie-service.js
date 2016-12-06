angular.module('kinder-app').service('CookieService', function ($cookies) {

    this.addToCookie = function(key,value) {
        $cookies.put(key, value);
    };

    this.getFromCookie = function(key) {
        return $cookies.get(key);
    };

    this.deleteFromCookie = function(key) {
        $cookies.remove(key);
    };

});
