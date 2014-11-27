'use strict';

// Tasks controller
angular.module('tasks')
  .controller('TasksController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Uuid', 'Sample', 'moment', 'GANTT_EVENTS', '$modal', 'Persons', 'Projects', 'Tasks', 'SwitchViews',
    function($http, $scope, $stateParams, $location, $timeout, Authentication, Uuid, Sample, moment, GANTT_EVENTS, $modal, Persons, Projects, Tasks, SwitchViews) {

      $scope.authentication = Authentication;
      var assignment = {};
      var autoView = {
        resource: Persons
      };
      SwitchViews.state = 'Person';

      /* Function to Open Modal */
      $scope.triggerModal = function(size) {
        
        var modalInstance = $modal.open({
          templateUrl: '/modules/core/views/assign_task_modal.client.view.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {}
        });

        modalInstance.result.then(function(data) {
          if (SwitchViews.state === 'Person') {
            assignment.projectId = data._id;
            assignment.projectName = data.name;
          } else {
            assignment.personId = data._id;
            assignment.personName = data.name;
          }
          $scope.createTask(assignment);
        }, function() {});
      };

      $scope.getTaskData = function() {
        var dataObj = [];
        $scope.dbData = autoView.resource.query({}, function() {
          $scope.dbData.forEach(function(assign) {
            var $label = {};
            $label.tasks = [];
            $label.id = assign._id;
            $label.name = assign.name;
            assign.tasks.forEach(function(task) {
              var $task = {};
              $task.id = task._id;
              $task.from = task.startDate;
              $task.to = task.endDate;
              $task.color = '';
              $task.name = (SwitchViews.state === 'Person') ? task.projectName : task.personName;
              $label.tasks.push($task);
            });
            dataObj.push($label);
          });
          $scope.loadData(dataObj);
        });
      };

      $scope.$on('response', function(event, notification){
        $scope.notify = false;
        $timeout(function(){
          $scope.notify = true;
          $scope.msg = notification;
        }, 200);
          $scope.msg = '';
      });

      // Creating a new Assignment/Task
      $scope.createTask = function(data) {
        var newTask = {
          personId: data.personId,
          projectId: data.projectId,
          startDate: data.startDate,
          endDate: data.endDate
        };
        var task = new Tasks(newTask);
        task.$save(function(response) {
          var taskParam = {
            id: response._id, //projectId, //_id
            from: response.startDate,
            to: response.endDate,
            color: '#85A3E0'
          };

          if (SwitchViews.state === 'Person') {
            taskParam.name = response.projectName;
          } else {
            taskParam.name = response.personName;
          }

          var uiItem = data.infoData.row.addTask(taskParam);
          uiItem.updatePosAndSize();
          uiItem.row.updateVisibleTasks();
          //learn about $scope.apply
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.updateTask = function(event, data) {
        var task = Tasks.get({
          taskId: data.task.id
        });
        task._id = data.task.id;
        task.startDate = data.task.from;
        task.endDate = data.task.to;
        task.$update(function() {
          //alert('Updated Successfully taskId');
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };


      $scope.options = {
        mode: 'custom',
        scale: 'day',
        maxHeight: false,
        width: true,
        autoExpand: 'both',
        taskOutOfRange: 'expand',
        fromDate: undefined,
        toDate: undefined,
        showLabelsColumn: true,
        currentDate: 'line',
        currentDateValue: Date.now(),
        draw: true,
        allowLabelsResizing: true,
        timeFrames: {
          'day': {
            start: moment('8:00', 'HH:mm'),
            end: moment('20:00', 'HH:mm'),
            working: true,
            default: true
          },
          'noon': {
            start: moment('12:00', 'HH:mm'),
            end: moment('13:30', 'HH:mm'),
            working: false,
            default: true
          },
          'weekend': {
            working: false
          }
        },
        dateFrames: {
          'weekend': {
            evaluator: function(date) {
              return date.isoWeekday() === 6 || date.isoWeekday() === 7;
            },
            targets: ['weekend']
          }
        },
        timeFramesNonWorkingMode: 'visible',
        columnMagnet: '5 minutes'
      };

      $scope.$watch('fromDate+toDate', function() {
        $scope.options.fromDate = $scope.fromDate;
        $scope.options.toDate = $scope.toDate;
      });

      $scope.$watch('options.scale', function(newValue, oldValue) {
        if (!angular.equals(newValue, oldValue)) {
          if (newValue === 'quarter') {
            $scope.options.headersFormats = {
              'quarter': '[Q]Q YYYY'
            };
            $scope.options.headers = ['quarter'];
          } else {
            $scope.options.headersFormats = undefined;
            $scope.options.headers = undefined;
          }
        }
      });

      $scope.$on(GANTT_EVENTS.READY, function() {
        $scope.addSamples();
        $timeout(function() {
          $scope.scrollToDate($scope.options.currentDateValue);
        }, 0, true);
      });

      $scope.addSamples = function() {
        /* Chimela, Deji, Jide look for error on this line */
        $scope.loadTimespans(Sample.getSampleTimespans().timespan1);
        $scope.getTaskData();
      };

      $scope.loadTabData = function(view) {
        SwitchViews.state = view;
        
        switch(view) {
          case 'Person':
            autoView.resource = Persons;
            break;
          case 'Project':
            autoView.resource = Projects;
            break;
        }

        $scope.clearData();
        $scope.getTaskData();
        
      };
      
      var handleClickEvent = function(event, data) {
        switch(SwitchViews.state) {
          case 'Person':
            assignment.personId = data.row.id;
            break;
          case 'Project':
            assignment.projectId = data.row.id;
            break;
        }

        $scope.triggerModal();

        if ($scope.options.draw) {
          if ((data.evt.target ? data.evt.target : data.evt.srcElement).className.indexOf('gantt-row') > -1) {
            assignment.startDate = data.date;
            assignment.endDate = moment(data.date).add(7, 'd');
            assignment.infoData = data;
          }
        }

      };

      $scope.$on(GANTT_EVENTS.TASK_DBL_CLICKED, function(event, data) {
        data.task.row.removeTask(data.task.id);
        Tasks.delete({
          taskId: data.task.id
        });
      });

      $scope.$on(GANTT_EVENTS.TASK_CHANGED, function(event, data) {
        $scope.updateTask(event, data);
      });

      $scope.$on(GANTT_EVENTS.TASK_MOVE_END, function(event, data) {});
      $scope.$on(GANTT_EVENTS.TASK_RESIZE_END, $scope.updateTask);
      $scope.$on(GANTT_EVENTS.ROW_CLICKED, handleClickEvent);
    }
  ]);
