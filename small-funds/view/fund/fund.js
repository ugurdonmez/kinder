angular
    .module('data-explorer')
    .controller('SmallFundCtrl', function($scope, $rootScope, $modal, $routeParams, FundService, fundTypes) {

        $scope.fundId = $routeParams.fundId;
		$scope.fundType = fundTypes['Small Fund'];

		$scope.fetchFund = function () {
			FundService.get($scope.fundId, $scope.fundType)
				.then(function(response){

                    $scope.fetchFundSuccess = response.success;

					if ( response["success"] ) {
                        $scope.fund = response["data"];
						$scope.initialFund = $.extend(true, {}, response["data"]);
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

		$scope.fetchFundCiks = function () {
			FundService.fetchFundCiks($scope.fundId, $scope.fundType)
				.then(function(response){

                    $scope.fetchFundCiksSuccess = response.success;

					if ( response["success"]) {
                        $scope.fundCiks = response["data"];
					} else {
                        $scope.fetchFundCiksMessage = response['message'];
					}
				}, function(err) {
                    $scope.fetchFundCiksSuccess = false;

					$scope.fetchFundCiksMessage = 'An error occured while fetching fund cusips!';
				})
                .finally(function() {
                    $rootScope.safeApply();
                });
		};

		$scope.initFundObject = function() {
			$scope.fund = $.extend(true, {}, $scope.initialFund);
			$scope.fundInputAdminpass = "";
		};

		$scope.openRemoveDialog = function(fundId, fundCik) {
            $scope.removeInputCik = fundCik;
            $scope.removeInputFundId = fundId;
            var modalInstance = $modal.open({
                templateUrl: 'modals/admin-dialog/admin.html',
                controller: 'AdminCtrl',
                resolve: {
                    fireMethodName: function () {
                        return 'removeFundCik';
                    }
                }
            });
        };

        $scope.clearFundCache = function() {
            var modalInstance = $modal.open({
                templateUrl: 'modals/admin-dialog/admin.html',
                controller: 'AdminCtrl',
                resolve: {
                    fireMethodName: function () {
                        return 'clearFundCacheFireMethod';
                    }
                }
            });
        };

        $scope.$on('clearFundCacheFireMethod', function(event, args) {
            FundService.clearCacheNamespace($scope.fundId, args)
                .then(function(responseData){
                    $scope.clearCacheSuccess = responseData.success;
                    $scope.clearCacheMessage = responseData.message;
                }, function(err) {
                    $scope.clearCacheSuccess = false;
                    $scope.clearCacheMessage = "Failed at clearing the cache!";
                })
                .finally(function () {
                    $rootScope.safeApply();
                });
        });

        $scope.$on('removeCompleted', function(event, args) {
            $scope.fetchFundCiks();
        });

        $scope.$on('removeFundCik', function(event, args) {
            $scope.removeInputAdminpass = args;

            FundService.removeFundCik($scope.removeInputFundId, $scope.removeInputCik, $scope.fundType, $scope.removeInputAdminpass)
                .then(function(responseData){

                    $scope.cikRemoveSuccess = responseData.success;
                    $scope.cikRemoveMessage = responseData.message;

                    if (responseData.success) {
                        $scope.removeInputFundId = '';
                        $scope.removeInputCik = '';
                        $scope.removeInputAdminpass = '';
                        $rootScope.$broadcast('removeCompleted');
                    }
                }, function(err) {
                    $scope.cikRemoveSuccess = false;
                    $scope.cikRemoveMessage = 'An error occured while removing fund cik!';
                })
                .finally(function () {
                    $rootScope.safeApply();
                });
        });

		$scope.addFundCik = function() {
            $scope.disableInputs();
            FundService.insertFundCik($scope.fund.fundId, $scope.inputFundCik, $scope.fundType, $scope.fundCikInputAdminpass)
                .then(function(responseData){
                    $scope.fundCikInsertSuccess = responseData.success;
                    $scope.fundCikInsertMessage = responseData.message;

                    if (responseData.success) {
                        $scope.fundCikInputAdminpass = '';
                        $scope.inputFundCik = '';

                        $scope.fetchFundCiks();
                    }
                }, function(err) {
                    $scope.fundCikInsertSuccess = false;
                    $scope.fundCikInsertMessage = 'An error occured while inserting fund cik!';
                })
                .finally(function () {
                    $scope.enableInputs();
                    $rootScope.safeApply();
                });
        };

		$scope.updateFund = function() {
            $scope.disableInputs();
			FundService.update($scope.fund, $scope.fundInputAdminpass)
                .then(function(responseData){
                    $scope.fundUpdateSuccess = responseData.success;
                    $scope.fundUpdateMessage = responseData.message;

                    if (responseData.success) {
						$scope.fundInputAdminpass = '';
                        $scope.fetchFund();
                    }
                }, function(err) {
                    $scope.fundUpdateSuccess = false;
                    $scope.fundUpdateMessage = 'An error occured while updating fund!';
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
		$scope.fetchFundCiks();
});



