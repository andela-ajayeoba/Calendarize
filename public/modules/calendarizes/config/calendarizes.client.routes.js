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
		});
	}
]);