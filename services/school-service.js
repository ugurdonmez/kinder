angular.module('kinder-app').service('SchoolService', function () {

    this.addSchool = function(school) {

        firebase.database().ref('school/').push({
            name : school.name,
            manager : school.manager,
            managerTelephone : school.managerTelephone,
            schoolTelephone : school.schoolTelephone,
            secondContactPerson : school.secondContactPerson,
            secondContantNo : school.secondContantNo,
            address : school.address,
            // logoURL : school.logoURL,
            branchNumber : school.branchNumber,
            classNumber : school.classNumber,
            studentNumber : school.studentNumber,
            teacherNumber : school.teacherNumber,
            activationEmail : school.activationEmail,
            isActivated : school.isActivated,
            membershipStart : school.membershipStart.getTime(),
            membershipEnd : school.membershipEnd.getTime()
        });
    };

    this.getSchools = function() {
        return firebase.database().ref('school/').once('value');
    };
});
