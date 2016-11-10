angular
    .module('data-explorer')
    .controller('SmallFundHoldingCtrl', function($scope, $rootScope, $modal, $routeParams, FundService, fundTypes) {

		$scope.fundId = $routeParams.fundId;
		$scope.holdingId = $routeParams.holdingId;
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

		$scope.fetchFundHolding = function () {
			FundService.fetchFundHolding($scope.holdingId, $scope.fundType)
				.then(function(response){
                    $scope.fetchFundHoldingSuccess = response["success"];

					if ( response["success"] ) {
                        $scope.fundHolding = response["data"];
						$scope.initialFundHolding = $.extend(true, {}, response["data"]);
					} else {
                        $scope.fetchFundHoldingMessage = response['message'];
					}
				}, function(err) {
                    $scope.fetchFundHoldingSuccess = false;
					$scope.fetchFundHoldingMessage = 'An error occured while fetching fund information !';
				})
                .finally(function () {
                    $rootScope.safeApply();
                });
		};

		$scope.initFundHoldingObject = function() {
			$scope.fundHolding = $.extend(true, {}, $scope.initialFundHolding);
			$scope.fundHoldingInputAdminpass = "";
		};

		$scope.updateFundHolding = function() {
            $scope.disableInputs();
			FundService.updateFundHolding($scope.fundHolding, $scope.fundHoldingInputAdminpass)
                .then(function(responseData){
                    $scope.fundHoldingUpdateSuccess = responseData.success;
                    $scope.fundHoldingUpdateMessage = responseData.message;

                    if (responseData.success) {
						$scope.fundHoldingInputAdminpass = '';
                        $scope.fetchFundHolding();
                    }
                }, function(err) {
                    $scope.fundHoldingUpdateSuccess = false;
                    $scope.fundHoldingUpdateMessage = 'Failed at updating fund holding!';
                })
                .finally(function () {
                    $scope.enableInputs();
                    $rootScope.safeApply();
                });
        };

        $scope.disableInputs = function() {
            $scope.inputDisabled = true;
        };

        $scope.enableInputs = function() {
            $scope.inputDisabled = false;
        };

        // Kick-off controller
        $scope.fetchFund();
        $scope.fetchFundHolding();
});



