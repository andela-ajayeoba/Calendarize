'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'GANTT_EVENTS', '$modal', 'Projects', 'Tasks', 'SwitchViews',
  function($http, $scope, $stateParams, $location, $timeout, Authentication, GANTT_EVENTS, $modal, Projects, Tasks, SwitchViews) {
    $scope.authentication = Authentication;

    // Create new Project
    $scope.addProject = function() {
      var project = new Projects($scope.project);
      project.$save(function(response) {
        if (SwitchViews.state !== 'Person') {
          $scope.project = '';
          var newProject = [{
            'id': response._id,
            'name': response.name,
            'tasks': []
          }];
          $scope.loadData(newProject);
        }
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
  }
]);
