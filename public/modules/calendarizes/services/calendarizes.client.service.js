'use strict';

//Calendarizes service used to communicate Calendarizes REST endpoints

angular.module('calendarizes').factory('Persons', ['$resource',
    function($resource) {
        return $resource('persons/:personId', {
            personId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('calendarizes').factory('Projects', ['$resource',
    function($resource) {
        return $resource('projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('calendarizes').factory('Tasks', ['$resource',
    function($resource) {
        return $resource('tasks/:taskId', {
            taskId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
