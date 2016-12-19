angular.module('kinder-app').service('EmailService', function () {

    this.addEmail = function(email, type) {

        var name = email.split("@")[0];

        firebase.database().ref('users/'+ name).set({
            email : email,
            type : type
        });
    };
});
