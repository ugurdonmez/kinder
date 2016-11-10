angular.module('kinder-app').service('BranchService', function () {

    this.addBranch = function(name, manager, telephone, address) {
        var rootRef = firebase.database().ref();

        firebase.database().ref('branch/' + name).set({
            name: name,
            manager: manager,
            telephone: telephone,
            address: address
        });
    };
});
