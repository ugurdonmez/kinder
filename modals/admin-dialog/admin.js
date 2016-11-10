angular
    .module('data-explorer')
    .controller('AdminCtrl', function ($scope, $rootScope, $modalInstance, fireMethodName) {

        $scope.submit = function() {
            $rootScope.$broadcast(fireMethodName, $scope.adminpassInput);
            $modalInstance.dismiss('cancel');
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
});