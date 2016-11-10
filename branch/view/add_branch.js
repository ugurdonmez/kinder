angular
    .module('kinder-app')
    .controller('BranchCtrl', function($scope, BranchService) {
        $scope.addBranch = function() {
            BranchService.addBranch($scope.name, $scope.manager, $scope.telephone, $scope.address);
        };
});
