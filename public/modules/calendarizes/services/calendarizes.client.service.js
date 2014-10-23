'use strict';

//Calendarizes service used to communicate Calendarizes REST endpoints
angular.module('calendarizes').factory('Calendarizes', ['$resource',
	function($resource) {
		return $resource('calendarizes/:calendarizeId', { calendarizeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);