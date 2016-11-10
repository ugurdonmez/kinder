angular
    .module('data-explorer')
    .controller('SmallFundHoldingsCtrl', function($scope, $rootScope, $modal, $routeParams, FundService, fundTypes) {

		$scope.fundId = $routeParams.fundId;
        $scope.fundType = fundTypes['Small Fund'];

		$scope.fetchFilingPeriods = function() {
			FundService.fetchFilingPeriods()
				.then(function(response){

                    $scope.fetchFilingPeriodsSuccess = response["success"];

					if ( response["success"] ) {
                        $scope.filingPeriods = response["data"];
						$scope.filingPeriod = $scope.filingPeriods[0];
						$scope.fetchFundHoldings();
					} else {
                        $scope.fetchFilingPeriodsMessage = response['message'];
					}
				}, function(err) {
                    $scope.fetchFilingPeriodsSuccess = false;
					$scope.fetchFilingPeriodsMessage = 'An error occured while fetching filing periods!';
				})
                .finally(function () {
                    $rootScope.safeApply();
                });
		};

		$scope.fetchFund = function () {
            $scope.isLoading  = true;
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
					$scope.fetchFundMessage = 'An error occured while fetching fund information!';
				})
                .finally(function () {
                    $scope.isLoading  = false;
                    $rootScope.safeApply();
                });
		};


		$scope.fetchFundHoldings = function () {
            $scope.isLoading  = true;
			FundService.fetchFundHoldings($scope.fundId, $scope.filingPeriod, $scope.fundType)
				.then(function(response){
                    $scope.fetchFundHoldingsSuccess = response["success"];

					if (response["success"]) {
                        $scope.fundHoldings = response["data"];
					} else {
                        $scope.fetchFundHoldingsMessage = response['message'];
					}
				}, function(err) {
                    $scope.fetchFundHoldingsSuccess = false;
					$scope.fetchFundHoldingsMessage = 'An error occured while fetching fund holdings!';
				})
                .finally(function () {
                    $scope.isLoading  = false;
                    $rootScope.safeApply();
                });
		};

		$scope.openRemoveDialog = function(fundHoldingId) {
            $scope.removeFundHoldingId = fundHoldingId;
            var modalInstance = $modal.open({
                templateUrl: 'modals/admin-dialog/admin.html',
                controller: 'AdminCtrl',
                resolve: {
                    fireMethodName: function () {
                        return 'removeFundHolding';
                    }
                }
            });
        };

		$scope.$on('removeCompleted', function(event, args) {
            $scope.fetchFundHoldings();
        });

        $scope.$on('removeFundHolding', function(event, args) {
            $scope.removeInputAdminpass = args;

            FundService.removeFundHolding($scope.removeFundHoldingId, $scope.fundType, $scope.removeInputAdminpass)
                .then(function(response){

                    $scope.removeFundHoldingSuccess = response["success"];

                    if (response["success"]) {
                        $scope.removeFundHoldingId = '';
                        $scope.removeInputAdminpass = '';
                        $rootScope.$broadcast('removeCompleted');
                    } else {
                        $scope.removeFundHoldingMessage = response["message"];
                    }
                }, function(err) {
                    $scope.removeFundHoldingSuccess = false;
                    $scope.removeFundHoldingMessage = 'An error occured while removing fund holding!';
                })
                .finally(function () {
                    $rootScope.safeApply();
                });
        });

		// Kick-off Controller
		$scope.fetchFilingPeriods();
		$scope.fetchFund();
});



