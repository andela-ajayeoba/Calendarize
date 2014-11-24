'use strict';

// Persons controller
angular.module('persons').controller('PersonsController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'GANTT_EVENTS', '$modal', 'Persons', 'SwitchViews',
  function($http, $scope, $stateParams, $location, $timeout, Authentication, GANTT_EVENTS, $modal, Persons, SwitchViews) {

    $scope.authentication = Authentication;

    // Create new Person
    $scope.addPerson = function(popoverCloseFunction) {
      popoverCloseFunction();
      var person = new Persons($scope.person);
      person.$save(function(response) {
        if (SwitchViews.state !== 'Project') {
          $scope.person = '';
          var newPerson = [{
            'id': response._id,
            'name': response.name,
            'tasks': []
          }];
          $scope.loadData(newPerson);
        }

      }, function(errorResponse) {
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

    // Update existing Person
    $scope.updatePerson = function() {
      var person = $scope.person;
      person.$update(function() {}, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Persons
    $scope.findPersons = function() {
      var data = [];
      $scope.persons = Persons.query({}, function() {
        $scope.persons.forEach(function(user) {
          var $user = {};
          $user.tasks = [];
          $user.id = user._id;
          $user.name = user.name;
          user.tasks.forEach(function(task) {
            var $task = {};
            $task.id = task._id;
            $task.name = task.projectName;
            $task.from = task.startDate;
            $task.to = task.endDate;
            $task.color = '#F1C232';
            $user.tasks.push($task);
          });
          data.push($user);
        });
        $scope.loadData(data);
      });
    };

    // Find existing Person
    $scope.findOnePerson = function() {
      $scope.person = Persons.get({
        personId: $stateParams.personId
      });
    };
  }
]);
