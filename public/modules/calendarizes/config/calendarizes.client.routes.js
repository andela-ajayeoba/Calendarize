'use strict';

//Setting up route
angular.module('calendarizes').config(['$stateProvider',
	function($stateProvider) {
		// Calendarizes state routing
		$stateProvider.
		state('listCalendarizes', {
			url: '/calendarizes',
			templateUrl: 'modules/calendarizes/views/list-calendarizes.client.view.html'
		}).
		state('createCalendarize', {
			url: '/calendarizes/create',
			templateUrl: 'modules/calendarizes/views/create-calendarize.client.view.html'
		}).
		state('viewCalendarize', {
			url: '/calendarizes/:calendarizeId',
			templateUrl: 'modules/calendarizes/views/view-calendarize.client.view.html'
		}).
		state('editCalendarize', {
			url: '/calendarizes/:calendarizeId/edit',
			templateUrl: 'modules/calendarizes/views/edit-calendarize.client.view.html'
		}).
		state('listWorkers', {
			url: '/workers',
			templateUrl: 'modules/calendarizes/views/list-workers.client.view.html'
		}).
		state('createWorker', {
			url: '/workers/create',
			templateUrl: 'modules/calendarizes/views/create-worker.client.view.html'
		}).
		state('viewWorker', {
			url: '/workers/:workerId',
			templateUrl: 'modules/calendarizes/views/view-worker.client.view.html'
		}).
		state('editWorker', {
			url: '/workers/:workerId/edit',
			templateUrl: 'modules/calendarizes/views/edit-worker.client.view.html'
		}).

		state('listProjects', {
			url: '/projects',
			templateUrl: 'modules/calendarizes/views/list-projects.client.view.html'
		}).
		state('createProject', {
			url: '/projects/create',
			templateUrl: 'modules/calendarizes/views/create-project.client.view.html'
		}).
		state('viewProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/calendarizes/views/view-project.client.view.html'
		}).
		state('editProject', {
			url: '/projects/:projectId/edit',
			templateUrl: 'modules/calendarizes/views/edit-project.client.view.html'
		}).

		state('listAssignments', {
			url: '/assignments',
			templateUrl: 'modules/calendarizes/views/list-assignments.client.view.html'
		}).
		state('createAssignment', {
			url: '/assignments/create',
			templateUrl: 'modules/calendarizes/views/create-assignment.client.view.html'
		}).
		state('viewAssignment', {
			url: '/assignments/:assignmentId',
			templateUrl: 'modules/calendarizes/views/view-assignment.client.view.html'
		}).
		state('editAssignment', {
			url: '/assignments/:assignmentId/edit',
			templateUrl: 'modules/calendarizes/views/edit-assignment.client.view.html'
		}).
		state('projectsTimeline', {
			url: '/timeline/projects',
			templateUrl: 'modules/calendarizes/views/projects-view.client.view.html'
		}).
		state('workersTimeline', {
			url: '/timeline/workers',
			templateUrl: 'modules/calendarizes/views/workers-view.client.view.html'
		});

	}
]);