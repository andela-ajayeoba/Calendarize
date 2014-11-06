'use strict';

//Setting up route
angular.module('calendarizes').config(['$stateProvider',
	function($stateProvider) {
		// Calendarizes state routing
		$stateProvider.
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
		});

	}
]);