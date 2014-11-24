'use strict';

//Setting up route
angular.module('persons').config(['$stateProvider',
	function($stateProvider) {
		// Persons state routing
		$stateProvider.
		state('listPersons', {
			url: '/persons',
			templateUrl: 'modules/persons/views/list-persons.client.view.html'
		}).
		state('createPerson', {
			url: '/persons/create',
			templateUrl: 'modules/persons/views/create-person.client.view.html'
		}).
		state('viewPerson', {
			url: '/persons/:personId',
			templateUrl: 'modules/persons/views/view-person.client.view.html'
		}).
		state('editPerson', {
			url: '/persons/:personId/edit',
			templateUrl: 'modules/persons/views/edit-person.client.view.html'
		});
	}
]);