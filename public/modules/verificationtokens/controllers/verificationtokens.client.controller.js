'use strict';

// Verificationtokens controller
angular.module('verificationtokens').controller('VerificationtokensController', ['$scope', '$stateParams', '$location', 'Authentication', 'Verificationtokens',
	function($scope, $stateParams, $location, Authentication, Verificationtokens) {
		$scope.authentication = Authentication;

		// Create new Verificationtoken
		$scope.create = function() {
			// Create new Verificationtoken object
			var verificationtoken = new Verificationtokens ({
				name: this.name
			});

			// Redirect after save
			verificationtoken.$save(function(response) {
				$location.path('verificationtokens/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Verificationtoken
		$scope.remove = function(verificationtoken) {
			if ( verificationtoken ) { 
				verificationtoken.$remove();

				for (var i in $scope.verificationtokens) {
					if ($scope.verificationtokens [i] === verificationtoken) {
						$scope.verificationtokens.splice(i, 1);
					}
				}
			} else {
				$scope.verificationtoken.$remove(function() {
					$location.path('verificationtokens');
				});
			}
		};

		// Update existing Verificationtoken
		$scope.update = function() {
			var verificationtoken = $scope.verificationtoken;

			verificationtoken.$update(function() {
				$location.path('verificationtokens/' + verificationtoken._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Verificationtokens
		$scope.find = function() {
			$scope.verificationtokens = Verificationtokens.query();
		};

		// Find existing Verificationtoken
		$scope.findOne = function() {
			$scope.verificationtoken = Verificationtokens.get({ 
				verificationtokenId: $stateParams.verificationtokenId
			});
		};
	}
]);