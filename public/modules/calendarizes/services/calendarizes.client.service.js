'use strict';

//Calendarizes service used to communicate Calendarizes REST endpoints
// angular.module('calendarizes').factory('Calendarizes', ['$resource',
// 	function($resource) {
// 		return $resource('calendarizes/:calendarizeId', { calendarizeId: '@_id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);

angular.module('calendarizes').factory('Apicall', ['$resource',
	function($resource) {

		return {
			Persons: $resource('persons/:personId', {
						personId: '@_id'
			}, 
			{
				update: {
					method: 'PUT'
				}
			}),

			Projects: $resource('projects/:projectId', {
						projectId: '@_id'
			}, 
			{
				update: {
					method: 'PUT'
				}
			}),

			Tasks: $resource('tasks/:taskId', {
						taskId: '@_id'
			}, 
			{
				update: {
					method: 'PUT'
				}
			}),

		};
	}

]);
