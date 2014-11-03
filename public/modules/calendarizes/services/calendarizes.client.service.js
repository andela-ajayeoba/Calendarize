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
			Workers: $resource('workers/:workerId', {
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

			Assignments: $resource('assignments/:assignmentId', {
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