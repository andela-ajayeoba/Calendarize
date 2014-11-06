'use strict';

angular.module('calendarizes').controller('WorkersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Apicall',
	function($scope, $stateParams, $location, Authentication, Apicall) {
		$scope.authentication = Authentication;
		$scope.workers = [];
		$scope.worker = {};
		$scope.assignments = Apicall.Assignments.query();
		$scope.addWorker = function() {

			// Create new Worker object
			var worker = new Apicall.Workers ($scope.worker);

			// Redirect after save
			worker.$save(function(response) {
			$scope.workers.push(response);
			// $scope.workers.unshift(worker);				
				// $location.path('calendarizes/' + response._id);
					$scope.msg = 'Worker Successfully added';
				// Clear form fields
				$scope.worker = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		$scope.removeAssignment = function(i) {
			$scope.assignments[i].splice(0, 1);
		};
			


		$scope.updateWorker = function() {

			var worker = $scope.worker ;

			worker.$update(function() {
				// $location.path('calendarizes/' + calendarize._id);
				// Return a "Worker updated" success message
				// responseMessage('worker', 'updated');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});


		};

		$scope.selectWorker = function(worker) {
			$scope.worker =  worker;
			
		};

		$scope.assignProject = function(){
			var assignment = new Apicall.Assignments({
				// name: this.name,
				project: this.project,
				worker: this.worker,
				startDate: this.startDate,
				endDate: this.endDate,
				user: this.user,
				created: this.created
			});

			assignment.$save(function(response){
				$scope.assignments.push(response);
			});
		};


	}
]);


