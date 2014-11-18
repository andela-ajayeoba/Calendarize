'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'GANTT_EVENTS', '$modal', 'Projects', 'Tasks',
    function($http, $scope, $stateParams, $location, $timeout, Authentication, GANTT_EVENTS, $modal, Projects, Tasks) {
        $scope.authentication = Authentication;

        // Create new Project
        $scope.addProject = function() {
            var project = new Projects($scope.project);
            project.$save(function(response) {
                console.log('Project Successfully added');
                $scope.project = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Project
        $scope.removeProject = function(project) {
            if (project) {
                project.$remove();
                for (var i in $scope.projects) {
                    if ($scope.projects[i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            } else {
                $scope.project.$remove(function() {});
            }
        };

        // Update existing Project
        $scope.updateProject = function() {
            var project = $scope.project;
            project.$update(function() {}, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find existing Projects
        $scope.findOneProject = function() {
            $scope.project = Projects.get({
                projectId: $stateParams.projectId
            });
        };

        // Find a list of Projects
        $scope.listProjects = function() {
            $scope.projects = Projects.query();
            console.log($scope.projects);
        };
    }
]);
