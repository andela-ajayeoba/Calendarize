'use strict';

// Calendarizes controller
angular.module('calendarizes').controller('CalendarizesController', ['$scope','$modal','$log','$modalInstance','items','$stateParams', '$location', 'Authentication', 'Calendarizes',
	function($scope,$modal,$modalInstance, items,$stateParams,$location,Authentication,Calendarizes ) {
		$scope.authentication = Authentication;
		var ModalDemoCtrl = function ($scope, $modal) {
 		$scope.open = function (size) {
    	var modalInstance = $modal.open({
      	templateUrl: 'myModalContent.html',
      	controller: CalendarizesController,
      	size: size
    });
    modalInstance.result.then(function (take_me_outside) {
      $scope.message = take_me_outside;
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance) {
  $scope.take_me_outside = "asdfasdf";
  
  $scope.ok = function (take_me_outside) {
    console.log($modalInstance);
    $modalInstance.close(take_me_outside);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
		// Create new Calendarize
		$scope.create = function() {
			// Create new Calendarize object
			var calendarize = new Calendarizes ({
				name: this.name
			});

			// Redirect after save
			calendarize.$save(function(response) {
				$location.path('calendarizes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Calendarize
		$scope.remove = function( calendarize ) {
			if ( calendarize ) { calendarize.$remove();

				for (var i in $scope.calendarizes ) {
					if ($scope.calendarizes [i] === calendarize ) {
						$scope.calendarizes.splice(i, 1);
					}
				}
			} else {
				$scope.calendarize.$remove(function() {
					$location.path('calendarizes');
				});
			}
		};

		// Update existing Calendarize
		$scope.update = function() {
			var calendarize = $scope.calendarize ;

			calendarize.$update(function() {
				$location.path('calendarizes/' + calendarize._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Calendarizes
		$scope.find = function() {
			$scope.calendarizes = Calendarizes.query();
		};

		// Find existing Calendarize
		$scope.findOne = function() {
			$scope.calendarize = Calendarizes.get({ 
				calendarizeId: $stateParams.calendarizeId
			});
		};
		
	}
]);