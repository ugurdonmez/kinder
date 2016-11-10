angular
    .module('data-explorer')
    .controller('SmallFund13fFilingsCtrl', function($scope, $rootScope, $modal, $routeParams, FundService, fundTypes, Filing13fService) {

		$scope.fundId = $routeParams.fundId;
        $scope.fundType = fundTypes['Small Fund'];

        $scope.fetchFund = function () {
            FundService.get($scope.fundId, $scope.fundType)
                .then(function(response){
                    $scope.fetchFundSuccess = response["success"];

                    if ( response["success"] ) {
                        $scope.fund = response["data"];
                    } else {

                        $scope.fetchFundMessage = response['message'];
                    }
                }, function(err) {
                    $scope.fetchFundSuccess = false;
                    $scope.fetchFundMessage = 'An error occured while fetching fund information !';
                })
                .finally(function () {
                    $rootScope.safeApply();
                });
        };

		$scope.fetchFund13fFilings = function () {
            $scope.isLoading  = true;
			Filing13fService.fetchFund13fFilings($scope.fundId, $scope.fundType)
				.then(function(response){
                    $scope.fetchFund13fFilingsSuccess = response["success"];

					if (response["success"]) {
                        $scope.filings13F = response["data"];
					} else {
                        $scope.fetchFund13fFilingsMessage = response['message'];
					}
				}, function(err) {
                    $scope.fetchFund13fFilingsSuccess = false;
					$scope.fetchFund13fFilingsMessage = 'An error occured while fetching 13F filings!';
				})
                .finally(function () {
                    $scope.isLoading  = false;
                    $rootScope.safeApply();
                });
		};

		// Kick-off Controller
		$scope.fetchFund();
        $scope.fetchFund13fFilings();
});



