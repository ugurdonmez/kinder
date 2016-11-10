angular
    .module('data-explorer')
    .controller('SmallFundsCtrl', function($scope, $rootScope, $modal, $routeParams, FundService, fundTypes) {

		$scope.fundsLetters = ['A', 'B', 'C', 'D', 'E',
                               'F', 'G', 'H', 'I', 'J',
                               'K', 'L', 'M', 'N', 'O',
                               'P', 'Q', 'R', 'S', 'T',
                               'U', 'V', 'W', 'X', 'Y', 'Z'];

		if (typeof $routeParams.fundLetter === 'undefined') {
			$scope.fundLetter = 'A';
		} else {
			$scope.fundLetter = $routeParams.fundLetter;
		}

		$scope.fetchFunds = function () {
            $scope.isLoading  = true;

			FundService.list($scope.fundLetter, fundTypes['Small Fund'])
				.then(function(response){
                    $scope.fetchFundsSuccess = response["success"];

					if (response["success"]) {
                        $scope.funds = response["data"];
					} else {
                        $scope.fetchFundsMessage = response['message'];
					}
				}, function(err) {
                    $scope.fetchFundsSuccess = false;
					$scope.fetchFundsMessage = 'An error occured while fetching fund list!';
				})
                .finally(function () {
                    $scope.isLoading = false;
                    //angular.element(document.querySelector('#funds-list-div')).removeClass('loading-opacity');
                    $rootScope.safeApply();
                });
		};

		// Kick-off Controller
		$scope.fetchFunds();
});



