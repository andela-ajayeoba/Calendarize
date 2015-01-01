'use strict';

angular.module('users').controller('AuthenticationController', ['$http','$scope', '$location','$stateParams', 'Authentication','Guests',
	function($http, $scope, $location, $stateParams, Authentication, Guests) {
		$scope.authentication = Authentication;
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.getGuestDetail = function(){
				var detail = Guests.query({ 
						guestId: $stateParams.guestId
					}, function(){
					$scope.credentials = {
						name : detail[0].name,
						email : detail[0].email,
						verified : true,
						guestParam : {
							id : detail[0]._id,
							owner : detail[0].user
						}
					};									
				});
		};

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				// $scope.authentication.user = response;

				// And redirect to the confirmation page
				if (!response.verified) {
					$location.path('/confirmation');
				}
				else{
					$location.path('/signin');
				}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
