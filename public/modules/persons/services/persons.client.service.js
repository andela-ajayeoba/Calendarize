'use strict';

//Persons service used to communicate Persons REST endpoints
angular.module('persons').factory('Persons', ['$resource',
	function($resource) {
		return $resource('persons/:personId', { personId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);