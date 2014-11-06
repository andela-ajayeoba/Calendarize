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
			Workers: $resource('persons/:personId', {
						workerId: '@_id'
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

			Assignments: $resource('tasks/:taskId', {
						projectId: '@_id'
			}, 
			{
				update: {
					method: 'PUT'
				}
			}),

		};
	}

]);