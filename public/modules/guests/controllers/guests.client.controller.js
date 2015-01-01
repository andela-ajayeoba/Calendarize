'use strict';

// Guests controller
angular.module('guests').controller('GuestsController', ['$scope', '$timeout', 'Authentication', 'Guests',
	function($scope, $timeout, Authentication, Guests) {
		$scope.authentication = Authentication;
		$scope.notify = true;

		// Create new Guest
		$scope.sendInvite = function(closePopover) {
			// Create new Guest object
      closePopover();
			var guest = new Guests ($scope.guest);
			guest.$save(function(response) {
				$scope.guest = '';
        $scope.guests.push(response);
        $scope.msg = response.email + ' was successfully invited';
        $scope.$emit('response', $scope.msg);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Guest
		$scope.removeGuest = function(guest) {
			if ( guest ) { 
				guest.$remove();
        $scope.msg = guest.email + ' was successfully deleted';
        $scope.$emit('response', $scope.msg);

				for (var i in $scope.guests) {
					if ($scope.guests [i] === guest) {
						$scope.guests.splice(i, 1);
					}
				}
			} else {
				$scope.guests.$remove(function() {});
			}
		};

    /**
     * Flash Notification
     */
    $scope.$on('response', function(event, notification) {
      $scope.notify = true;
      $timeout(function() {
        $scope.notify = false;
        $scope.msg = notification;
        $('.response').css('opacity', 0);
      }, 200);
      $scope.msg = '';
    });

    // Find a list of Guests
    $scope.findGuests = function() {
      $scope.guests = Guests.query();
    };


		// Update existing Guest
		$scope.updateGuest = function(guestInfo) {
			var guest = guestInfo;

			guest.$update(function() {
			guest.$remove();
        $scope.msg = guest.email + ' was successfully updated';
        $scope.$emit('response', $scope.msg);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// // Find existing Guest
		// $scope.findOne = function() {
		// 	$scope.guest = Guests.get({ 
		// 		guestId: $stateParams.guestId
		// 	});
		// };
	}
]);
