'use strict';

//Setting up route
angular.module('calendarizes').config(['$stateProvider',
    function($stateProvider) {
        // Calendarizes state routing
        $stateProvider.
        state('listPersons', {
            url: '/workers',
            templateUrl: 'modules/calendarizes/views/list-workers.client.view.html'
        }).
        state('createPerson', {
            url: '/workers/create',
            templateUrl: 'modules/calendarizes/views/create-worker.client.view.html'
        }).
        state('viewPerson', {
            url: '/workers/:workerId',
            templateUrl: 'modules/calendarizes/views/view-worker.client.view.html'
        }).
        state('editPerson', {
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
            url: '/tasks/:taskId',
            templateUrl: 'modules/calendarizes/views/view-assignment.client.view.html'
        }).
        state('editAssignment', {
            url: '/tasks/:taskId/edit',
            templateUrl: 'modules/calendarizes/views/edit-assignment.client.view.html'
        });

    }
]);
