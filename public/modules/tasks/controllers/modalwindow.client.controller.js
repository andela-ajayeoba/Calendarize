  'use strict';

// Tasks controller
angular.module('tasks')
  .controller('AssignTaskController', function($rootScope, $scope, $modalInstance, Projects, Persons, SwitchViews) {
    // SwitchViews.taskClicked.isClicked = false;
    $scope.findData = function() {
      switch (SwitchViews.state) {
        case 'Project':
          $scope.datas = Persons.query();
          break;
        case 'Person':
          $scope.datas = Projects.query();
          break;
      }
    };

    $scope.taskClicked = SwitchViews.taskClicked.isClicked;
    $scope.task = SwitchViews.taskClicked.taskObj;

    $scope.selectedData = function(data) {
      $modalInstance.close(data);
    };

    $scope.deleteSelectedTask  = function(task){
      $modalInstance.close(task);
    };

    $scope.cancel = function() {
      SwitchViews.taskClicked.isClicked = false;
      $modalInstance.dismiss('cancel');

    };

  });
