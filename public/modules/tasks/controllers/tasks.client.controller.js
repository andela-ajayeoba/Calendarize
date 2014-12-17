'use strict';

// Tasks controller
angular.module('tasks')
  .controller('TasksController', ['$http', '$scope', '$stateParams', '$location', '$timeout', 'Authentication', '$log', 'Sample', 'moment', '$modal', 'Persons', 'Projects', 'Tasks', 'SwitchViews',
    'GanttObjectModel', 'ganttDebounce', 'ganttUtils', 'ganttMouseOffset',
    function($http, $scope, $stateParams, $location, $timeout, Authentication, $log, Sample, moment, $modal, Persons, Projects, Tasks, SwitchViews, ObjectModel, debounce, utils, mouseOffset) {

      // Global Variables
      $scope.authentication = Authentication;
      $scope.assignTask = {};
      $scope.globalRowData = {};
      var objectModel, dataToRemove;
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
      $scope.msg = '';
      $scope.notify = true;


      /**
       * Task Functions
       */
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
            from: new Date(response.startDate),
            to: new Date(response.endDate),
            color: '#81b208'
          };

          if (SwitchViews.state === 'Person') {
            taskParam.name = response.projectName;
          } else {
            taskParam.name = response.personName;
          }

          $scope.drawTaskHandler(taskParam);
          //learn about $scope.apply
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      $scope.delUpTask = function (assignment, data){
          var tskParam = SwitchViews.taskClicked.taskObj.tasks[0].id;
          var task = Tasks.get({
            taskId: tskParam
          });        
          switch (SwitchViews.state) {
            case 'Person':
              task.projectId = assignment.projectId;
              task.projectName = assignment.projectName;
              break;
            case 'Project':
              task.personId = assignment.personId;
              task.personName = assignment.personName;
              break;
          }
          task._id = tskParam;
          task.$update(function() {
            SwitchViews.taskClicked.isClicked = false;
            SwitchViews.taskClicked.taskRowData.model.name = data.name;
          }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
          });
      };

      // Updating Tasks
      $scope.updateTask = function(event, data) {
        var task = Tasks.get({
          taskId: data.model.id
        });
        task._id = data.model.id
        task.startDate = moment(data.model.from).format();
        task.endDate = moment(data.model.to).format();
        task.$update(function() {}, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };


      // Function to Populate Calender with Data
      $scope.getTaskData = function() {
        $scope.data = [];
        $scope.dbData = autoView.resource.query({
            isActive: true
          },
          function() {
            $scope.dbData.forEach(function(assign) {
              var $label = {};
              $label.tasks = [];
              $label.id = assign._id;
              $label.name = assign.name;
              assign.tasks.forEach(function(task) {
                var $task = {};
                $task.id = task._id;
                $task.from = moment(task.startDate);
                $task.to = moment(task.endDate);
                $task.color = '#81b208';
                $task.name = (SwitchViews.state === 'Person') ? task.projectName : task.personName;
                $label.tasks.push($task);
              });
              $scope.data.push($label);
            });
          });
      };

      /**
       * Modal Windows Function
       */
      /* Function to open Assignment modal windows */
      $scope.triggerAssignModal = function(size) {
        var modalInstance = $modal.open({
          templateUrl: '/modules/core/views/assign_task_modal.client.view.html',
          controller: 'AssignTaskController',
          size: 'sm',
          resolve: {}
        });
        modalInstance.result.then(function(data) {
        if(data === undefined){
          SwitchViews.taskClicked.isClicked = false;
          var delTask = SwitchViews.taskClicked.taskObj;
          $scope.api.data.remove([delTask]);
          Tasks.delete({
            taskId: delTask.tasks[0].id
          });          
        } else{
            switch (SwitchViews.state) {
              case 'Person':
                assignment.projectId = data._id;
                assignment.projectName = data.name;
                break;
              case 'Project':
                assignment.personId = data._id;
                assignment.personName = data.name;
                break;
            }

            if(!SwitchViews.taskClicked.isClicked){
              $scope.createTask(assignment);
            }
            else {           
              $scope.delUpTask(assignment, data);
            }
          }
        }, function() {});
      };

      /*  Trigger Update Modal Window  */
      $scope.triggerUpdateModal = function(details) {
        var updateObj = {
          controller: function($scope, updateData, $modalInstance) {
            $scope.updateData = updateData;
            $scope.updateLabel = function() {
              labelDetailUpdate(updateData);
              $modalInstance.close();
            };
            $scope.deactivate = function() {
              deactivateRow(updateData);
              $modalInstance.close();
            };
            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
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

      /* Function to trigger the view of Inactive Project/Person */
      var viewInactiveModal = function(list) {
        var inactiveList = $modal.open({
          templateUrl: '/modules/core/views/view_inactive.client.view.html',
          controller: function($scope, $modalInstance, listData) {
            $scope.datas = listData;
            $scope.state = SwitchViews.state;
            $scope.activateData = function(data) {
              activateData(data);
              $modalInstance.close();
            };
            $scope.deleteData = function(data) {
              deleteData(data);
              $modalInstance.close();
            };
            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
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

      /**
       * Flash Notification
       */
      $scope.$on('response', function(event, notification) {
        $scope.notify = true;
        $timeout(function() {
          $scope.notify = false;
          $scope.msg = notification;
          $('.response').css('opacity', 0);
        }, 200);
        $scope.msg = '';
      });

      /**
       * Row Label Functions
       */
      $scope.getRowDetails = function(data) {
        $scope.globalRowData.data = data;
        var id = data.model.id;
        autoView.param[autoView.paramKey] = id;
        $scope.detail = autoView.resource.get(autoView.param);
        $scope.triggerUpdateModal($scope.detail);
      };

      var labelDetailUpdate = function(labelData) {
        var label = labelData;
        label.$update(function(response) {
          $scope.globalRowData.data.model.name = response.name;
          $scope.msg = response.name + ' is successfully updated';
          $scope.$emit('response', $scope.msg);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };
      $scope.labelDetailUpdate = labelDetailUpdate;

      var deactivateRow = function(data) {
        dataToRemove = [{
          'id': data._id
        }];
        $scope.api.data.remove(dataToRemove);
        $scope.infoData = data;
        $scope.infoData._id = data._id;
        $scope.infoData.isActive = false;
        $scope.infoData.$update(function(response) {
          $scope.msg = response.name + ' is now inactive';
          $scope.$emit('response', $scope.msg);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };
      $scope.deactivateRow = deactivateRow;

      // Get inactive assignments
      $scope.viewInactive = function() {
        var inactiveList = autoView.resource.query({
          isActive: false
        });
        viewInactiveModal(inactiveList);
      };

      var activateData = function(data) {
        autoView.param[autoView.paramKey] = data._id;
        $scope.lbl = autoView.resource.get(autoView.param);
        $scope.lbl.isActive = true;
        $scope.lbl._id = data._id;
        $scope.lbl.$update(function(response) {
          $scope.reload();
          $scope.msg = response.name + ' is now active';
          $scope.$emit('response', $scope.msg);

        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };
      $scope.activateData = activateData;

      var deleteData = function(labelData) {
        var lbl = labelData;
        lbl.$delete(function(response) {
          $scope.msg = response.name + ' is successfully deleted';
          $scope.$emit('response', $scope.msg);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };
      $scope.deleteData = deleteData;

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

        $scope.clear();
        $scope.load();

      };

      /**
       * Angular Gantt-chart Options/Functions
       */

      $scope.options = {
        scale: 'day',
        width: true,
        autoExpand: 'both',
        taskOutOfRange: 'expand',
        fromDate: moment(Date.now()).subtract(2, 'days'),
        toDate: moment(Date.now()).add(1, 'months'),
        allowSideResizing: true,
        labelsEnabled: true,
        currentDate: 'column',
        currentDateValue: Date.now(),
        draw: false,
        readOnly: false,
        headersFormats: {
          'year': 'YYYY',
          'quarter': '[Q]Q YYYY',
          month: 'MMMM YYYY',
          week: function(column) {
            return column.date.format('MMM D [-]') + column.endDate.format('[ ]MMM D');
          },
          day: 'ddd',
          hour: 'H',
          minute: 'HH:mm'
        },
        timeFrames: {
          'day': {
            start: moment('0:00', 'HH:mm'),
            end: moment('23:59', 'HH:mm'),
            working: true,
            default: true
          },
          'weekend': {
            working: false
          },
          'holiday': {
            working: false,
            color: 'red',
            classes: ['gantt-timeframe-holiday']
          }
        },
        dateFrames: {
          'weekend': {
            evaluator: function(date) {
              return date.isoWeekday() === 6 || date.isoWeekday() === 7;
            },
            targets: ['weekend']
          },
          '24-December': {
            evaluator: function(date) {
              return date.month() === 10 && date.date() === 11;
            },
            targets: ['holiday']
          }
        },
        timeFramesNonWorkingMode: 'visible',
        columnMagnet: '5 minutes',
        drawTaskFactory: function(data) {
          var task = {};
          return task;
        },
        api: function(api) {
          // API Object is used to control methods and events from angular-gantt.
          $scope.api = api;

          api.core.on.ready($scope, function() {

            // When gantt is ready, load data.
            if ($scope.authentication.user !== '') {

              $scope.load();

            };

            if (api.tasks.on.moveBegin) {
              api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', $scope.updateTask));
              api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', $scope.updateTask));
            }

            // Add some DOM events
            api.directives.on.new($scope, function(directiveName, directiveScope, element) {
              if (directiveName === 'ganttTask') {
                element.bind('click', function() {
                  // $(document).on('dblclick',element, function() {
                  var data = directiveScope.task;
                  SwitchViews.taskClicked.isClicked = true;
                  SwitchViews.taskClicked.taskObj = {
                    'id' : data.row.model.id,
                    'tasks':[{
                      'id': data.model.id,
                      'name': data.model.name
                    }]
                  };
                  SwitchViews.taskClicked.taskRowData = data;

                });

              } else if (directiveName === 'ganttRow') {
                element.bind('click', function(evt) {
                  var data = directiveScope.row;

                  switch (SwitchViews.state) {
                    case 'Person':
                      assignment.personId = data.model.id;
                      break;
                    case 'Project':
                      assignment.projectId = data.model.id;
                      break;
                  }
                  var getDate = api.core.getDateByPosition(mouseOffset.getOffset(evt).x);
                  var taskBegin = moment(getDate).format();
                  assignment.startDate = moment(taskBegin).format('YYYY-MM-DD');
                  var taskEnd = moment(assignment.startDate).add(7, 'd');
                  assignment.endDate = moment(taskEnd).format('YYYY-MM-DD');

                  $scope.triggerAssignModal();

                  $scope.drawTaskHandler = function(task) {

                    var taskParam = $scope.options.drawTaskFactory();
                    taskParam = {
                      id: task.id,
                      name: task.name,
                      from: assignment.startDate,
                      to: assignment.endDate,
                      color: '#81b208'
                    };

                    var uiItem = directiveScope.row.addTask(taskParam);
                    uiItem.updatePosAndSize();

                    directiveScope.row.updateVisibleTasks();
                  };

                });

              } else if (directiveName === 'ganttRowLabel') {
                element.bind('click', function() {
                  var data = directiveScope.row;
                  $scope.getRowDetails(data);
                });
              }
              // else if (directiveName === 'ganttTimespan'){
              // }
            });

            api.tasks.on.rowChange($scope, function(task) {
              $scope.live.row = task.row.model;
            });

            objectModel = new ObjectModel(api);
          });
        }
      };

      // Reload data action
      $scope.load = function() {
        $scope.getTaskData();
        dataToRemove = undefined;
        $scope.api.side.setWidth(140);
      };

      $scope.reload = function() {
        $scope.load();
      };

      // Remove data action
      $scope.remove = function(data) {
        dataToRemove = [data];
        $scope.api.data.remove(dataToRemove);
      };

      // Clear data action
      $scope.clear = function() {
        $scope.data = [];
      };

      // Event utility function
      var addEventName = function(eventName, func) {
        return function(data) {
          return func(eventName, data);
        };
      };
    }
  ]);
