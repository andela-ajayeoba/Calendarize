'use strict';

// Calendarizes controller
angular.module('calendarizes').controller('CalendarizesController', ['$scope', '$stateParams', '$location', 'Authentication','Apicall','$modal', '$log',
	function($scope, $stateParams, $location, Authentication, gantt, Apicall, $modal, $log ) {
		$scope.authentication = Authentication;


			// End of modals

		/************************************************
					WORKERS CRUD
		************************************************/

		//Response to action message
		var responseMessage = function(title, action){
			$scope.msg = title+ ' is successfully '+ action;
		};

		// Creating a new worker
		$scope.addWorker = function() {
			// Create new Calendarize object
			var worker = new Apicall.Workers ($scope.worker);

			// Redirect after save
			worker.$save(function(response) {
				// $location.path('calendarizes/' + response._id);
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
				responseMessage('worker', 'updated');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};			

		// Find a list of Workers
		$scope.findWorkers = function() {
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
			var project = new Apicall.Projects ($scope.project);

			// Redirect after save
			project.$save(function(response) {
				// $location.path('calendarizes/' + response._id);
					// $scope.msg = 'Project Successfully added';
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
					// $location.path('calendarizes');
				});
			}
		};

		// Update existing Calendarize
		$scope.updateProject = function() {
			var project = $scope.project ;

			project.$update(function() {
				// $location.path('calendarizes/' + calendarize._id);
				// Return a "Worker updated" success message
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};			

		// Find a list of Workers
		$scope.findProjects = function() {
			$scope.projects = Apicall.Projects.query();
		};

		// Find existing Worker
		$scope.findOneProject = function() {
			$scope.project = Apicall.Projects.get({ 
				projectId: $stateParams.projectId
			});
		};


		/************************************************
					ASSIGNMENT CRUD
		************************************************/
		// Creating a new Assignment
		$scope.createAssignment = function() {
			// Create new Calendarize object
			var assignment = new Apicall.Assignments ($scope.assignment);

			// Redirect after save
			assignment.$save(function(response) {
				// $location.path('calendarizes/' + response._id);
					// $scope.msg = 'Project Successfully added';
					console.log(response);
				// Clear form fields
				$scope.assignment = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Edit existing assignment
		$scope.findOneAssignment = function() {
			$scope.assignment = Apicall.Assignments.get({ 
				assignmentId: $stateParams.assignmentId
			});
		};

		// Update existing Assignment
		$scope.updateAssignment = function() {
			var assignment = $scope.assignment ;

			assignment.$update(function() {
				// $location.path('calendarizes/' + calendarize._id);
				// Return a "Worker updated" success message
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.findAssignments = function() {
			$scope.asignments = Apicall.Assignments.query();
		};


	}
]);