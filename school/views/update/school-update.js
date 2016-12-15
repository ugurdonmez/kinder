angular
    .module('kinder-app')
    .controller('SchoolUpdateCtrl', function($scope, $rootScope, $location, $routeParams, $rootScope, SchoolService, TranslationService, UserService) {

        $scope.schoolId = $routeParams.schoolId;

        TranslationService.getTranslation($scope, 'tr');
    
        $scope.uploadImage = function() {
            
            console.log("photo upload");
            
            /*
            if (!$scope.s3file) {
                console.log("file undefined!");
                return;
            }
            
            var storageRef = firebase.storage().ref();
            var mountainsRef = storageRef.child($scope.schoolId + '.jpg');

            var file = $scope.s3file;
            mountainsRef.put(file).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
            });
            
            console.log($scope.s3file);
            
            console.log("photo changed.");
            */
            
            
            
            var storageRef = firebase.storage().ref();
            
            // File or Blob named mountains.jpg
            var file = $scope.s3file;

            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('school-logos/'+ $scope.schoolId +'/' + file.name).put(file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function(error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                }, function() {
                    // Upload completed successfully, now we can get the download URL
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log(downloadURL);
                    $scope.school.logoURL = downloadURL;
                    console.log($scope.school);
            });
            
        };
    
        $scope.checkLogin = function() {
            if (!UserService.isUserLoggedIn()) {
                $location.path('/admin-login');
                $rootScope.safeApply();
            }
        };

        $scope.updateSchool = function() {
            SchoolService.updateSchool($scope.schoolId, $scope.school);
            $scope.init();
        };

        $scope.init = function() {
            SchoolService.getSchool($scope.schoolId).then(function(response){
                $scope.school = response.val();
                $scope.school.membershipStart = new Date($scope.school.membershipStart);
                $scope.school.membershipEnd = new Date($scope.school.membershipEnd);
                $rootScope.safeApply();
            });
        };

        $scope.uploadLogo = function() {

        };

        $scope.init();
        
        $scope.checkLogin();
});
