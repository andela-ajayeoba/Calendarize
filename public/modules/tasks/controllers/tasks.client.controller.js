'use strict';

// Tasks controller
angular.module('tasks')
  .controller('TasksController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Uuid', 'Sample', 'moment', 'GANTT_EVENTS', '$modal', 'Persons', 'Projects', 'Tasks', 'SwitchViews',
    function($http, $scope, $stateParams, $location, $timeout, Authentication, Uuid, Sample, moment, GANTT_EVENTS, $modal, Persons, Projects, Tasks, SwitchViews) {

      $scope.authentication = Authentication;
      var globalRowData = {};
      var assignment = {};
      var autoView = {
        resource: Persons,
        param: {
          personId: null
        },
        paramKey: 'personId'
      };
      SwitchViews.state = 'Person';
      $scope.dataView = SwitchViews.state;

      /* Function to Open Assignment Modal */
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

      // Function to trigger update modal for both Project/Person
      $scope.triggerUpdateModal = function(details) {
        var updateObj = {
          controller: function($scope, updateData, $modalInstance) {
            $scope.updateData = updateData;
            $scope.updateLabel = function() {
              updateRowLabel(updateData);
              $modalInstance.close();
            };
            $scope.deactivate = function() {
              deactivateRow(updateData);
              $modalInstance.close();
            };
          },
          size: 'sm',
          resolve: {
            updateData: function() {
              return details;
            }
          }
        };
        if (SwitchViews.state === 'Person') {
          updateObj.templateUrl = '/modules/core/views/edit_person.client.view.html';
        } else {
          updateObj.templateUrl = '/modules/core/views/edit_project.client.view.html';
        }
        var modalInstance = $modal.open(updateObj);
      };

      /* Function to trigger view inactivated projects/persons */
      var viewInactiveModal = function(list) {
        var inactiveList = $modal.open({
          templateUrl: '/modules/core/views/view_inactive.client.view.html',
          controller: function($scope, $modalInstance, listData) {
            $scope.datas = listData;
            $scope.state = SwitchViews.state;
            $scope.activateData = function(data) {
              activateRow(data);
              $modalInstance.close();
            };
            $scope.deleteData = function(data) {
              deleteRowLabel(data);
              $modalInstance.close();
            };
          },
          size: 'lg',
          resolve: {
            listData: function() {
              return list;
            }
          }
        });
      };

      /*  ROW LABEL FUNCTIONS  */
      var getRowDetails = function(event, data) {
        globalRowData.data = data;
        var id = data.row.id;
        autoView.param[autoView.paramKey] = id;
        var detail = autoView.resource.get(autoView.param);
        $scope.triggerUpdateModal(detail);
      };

      var updateRowLabel = function(labelData) {
        var label = labelData;
        label.$update(function(response) {
          globalRowData.data.row.name = response.name;
          $scope.msg = response.name + ' is successfully updated';
          $scope.$emit('response', $scope.msg);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };
       var deleteRowLabel = function(labelData) {
        var label = labelData;
        label.$delete(function(response) {
          $scope.msg = response.name + ' is successfully deleted';
          $scope.$emit('response', $scope.msg);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      var deactivateRow = function(data) {
        $scope.removeData([{
          'id': data._id
        }]);
        var rowData = data;
            rowData._id = data._id;
            rowData.isActive = false;
        rowData.$update(function(response) {
          $scope.msg = response.name + ' is now inactive';
          $scope.$emit('response', $scope.msg);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      var activateRow = function(data) {
        autoView.param[autoView.paramKey] = data._id;
        var label = autoView.resource.get(autoView.param);
        label.isActive = true;
        label._id = data._id;
        label.$update(function(response) {
          $scope.msg = response.name + ' is now active';
          $scope.$emit('response', $scope.msg);
          $scope.getTaskData();
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Function to Populate Calender with Data
      $scope.getTaskData = function() {
        var dataObj = [];
        $scope.dbData = autoView.resource.query({
          isActive: true
        }, function() {
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
              $task.color = '#81b208';
              $task.name = (SwitchViews.state === 'Person') ? task.projectName : task.personName;
              $label.tasks.push($task);
            });
            dataObj.push($label);
          });
          $scope.loadData(dataObj);
        });
      };

      // Flash notice function
      $scope.$on('response', function(event, notification) {
        $scope.notify = false;
        $timeout(function() {
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
            id: response._id,
            from: response.startDate,
            to: response.endDate,
            color: '#F1C232'
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

      // Get inactive assignments
      $scope.viewInactive = function() {
        var inactiveList = autoView.resource.query({
          isActive: false
        });
        viewInactiveModal(inactiveList);
      };

      // Gantt-Chart options
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
        $scope.dataView = view;
        switch (view) {
          case 'Person':
            autoView.resource = Persons;
            autoView.paramKey = 'personId';
            break;
          case 'Project':
            autoView.resource = Projects;
            autoView.paramKey = 'projectId';
            break;
        }

        $scope.clearData();
        $scope.getTaskData();

      };

      var handleClickEvent = function(event, data) {
        switch (SwitchViews.state) {
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
      $scope.$on(GANTT_EVENTS.ROW_LABEL_CLICKED, getRowDetails);
    }
  ]);
