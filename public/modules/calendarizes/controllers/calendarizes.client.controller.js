'use strict';

// Calendarizes controller
angular.module('calendarizes').controller('CalendarizesController', ['$scope','$modal','$stateParams', '$location', 'Authentication', 'Apicall',
	function($scope,$modal,$stateParams,$location, Authentication, Apicall ) {
		$scope.authentication = Authentication;
		console.log('test')
		/************************************************
					WORKERS CRUD
		************************************************/

		// Creating a new worker
		$scope.addWorker = function() {
			// Create new Calendarize object
			var worker = new Apicall.Workers ($scope.worker);
				console.log('hello');
				console.log(worker);
				console.log($scope.worker);
			// Redirect after save
			worker.$save(function(response) {
					$scope.msg = 'Worker Successfully added';
				// Clear form fields
				$scope.worker = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Remove existing Worker
		$scope.removeWorker = function( worker ) {
			if ( worker ) { worker.$remove();

				for (var i in $scope.workers) {
					if ($scope.workers [i] === worker ) {
						$scope.workers.splice(i, 1);
					}
				}
			} else {
				$scope.worker.$remove(function() {
					// $location.path('calendarizes');
				});
			}
		};

		// Update existing Calendarize
		$scope.updateWorker = function() {
			var worker = $scope.worker ;

			worker.$update(function() {
				// $location.path('calendarizes/' + calendarize._id);
				// Return a "Worker updated" success message
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};			

		// Find a list of Workers
		$scope.findWorker = function() {
			$scope.workers = Apicall.Workers.query();
		};

		// Find existing Worker
		$scope.findOneWorker = function() {
			$scope.worker = Apicall.Workers.get({ 
				workerId: $stateParams.workerId
			});
		};


		/************************************************
					PROJECTS CRUD
		************************************************/

		// Creating a new Project
		$scope.addProject = function() {
			// Create new Calendarize object
			console.log("dick");
			var project = new Apicall.Projects ($scope.project);
			console.log($scope.project);
			console.log(project);
			// Redirect after save
			project.$save(function(response) {
				console.log('Project Successfully added');
					console.log(response);
				// Clear form fields
				$scope.project = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Remove existing Project
		$scope.removeProject = function(project) {
			if (project) { project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project ) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
				});
			}
		};

		// Update existing Calendarize
		$scope.updateProject = function() {
			var project = $scope.project ;

			project.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};			

		// Find a list of Workers
		$scope.findProject = function() {
			$scope.projects = Apicall.Projects.query();
		};

		// Find existing Worker
		$scope.findOneProject = function() {
			$scope.project = Apicall.Projects.get({ 
				projectId: $stateParams.projectId
			});
		};




	}
]);