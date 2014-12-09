'use strict';

// Persons controller
angular.module('persons').controller('PersonsController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', '$modal', 'Persons', 'SwitchViews',
  function($http, $scope, $stateParams, $location, $timeout, Authentication, $modal, Persons, SwitchViews) {

    $scope.authentication = Authentication;
        // Create new Person
    $scope.addPerson = function(closePersonPopover) {
      closePersonPopover();
      var person = new Persons($scope.person);
      person.$save(function(response) {
        console.log('saving person');
        $scope.person = '';
        $scope.msg = response.name + ' was successfully created';
        $scope.$emit('response', $scope.msg);
        if (SwitchViews.state !== 'Project') {
          var newPerson = [{
            'id': response._id,
            'name': response.name,
            'tasks': []
          }];
          $scope.loadData(newPerson);
        }
      }, function(errorResponse) {
        console.log('error saving');
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Person
    $scope.removePerson = function(person) {
      if (person) {
        person.$remove();
        for (var i in $scope.persons) {
          if ($scope.persons[i] === person) {
            $scope.persons.splice(i, 1);
          }
        }
      } else {
        $scope.person.$remove(function() {});
      }
    };
  }
]);

