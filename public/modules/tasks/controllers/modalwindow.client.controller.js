  'use strict';

// Tasks controller
angular.module('tasks')
  .controller('AssignTaskController', function($rootScope, $scope, $modalInstance, Projects, Persons, SwitchViews) {

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

    $scope.selectedData = function(data) {
      $modalInstance.close(data);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  });
