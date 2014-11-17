'use strict';

// Projects controller
angular.module('calendarizes').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Apicall',
    function($scope, $stateParams, $location, Authentication, Apicall) {
        $scope.authentication = Authentication;

        // Create new Project
        $scope.addProject = function() {

            var project = new Apicall.Projects($scope.project);

            // Redirect after save
            project.$save(function(response) {
                // $location.path('calendarizes/' + response._id);
                // $scope.msg = 'Project Successfully added';
                console.log(response);
                // Clear form fields
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
                $scope.project.$remove(function() {
                    // $location.path('calendarizes');
                });
            }
        };

        // Update existing Calendarize
        $scope.updateProject = function() {
            var project = $scope.project;

            project.$update(function() {
                // $location.path('projects/' + project._id);
                // Return a "Worker updated" success message
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        // Find a list of Workers
        $scope.findProjects = function() {
            $scope.projects = Apicall.Projects.query();
        };

        // Find existing Worker
        $scope.findOneProject = function() {
            $scope.project = Apicall.Projects.get({
                projectId: $stateParams.projectId
            });
        };
         //inactivate a project
        $scope.inactivateProject = function() {
            var project = $scope.project;

            project.isactive = false;
            project.$update(function() {
                $location.path('projects/' + project._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        //activate inactivated project
        $scope.inactivateProject = function() {
            var project = $scope.project;

            project.isactive = true;
            project.$update(function() {
                $location.path('projects/' + project._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
