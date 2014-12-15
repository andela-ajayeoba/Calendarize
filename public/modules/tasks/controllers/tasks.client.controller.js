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

      // Updating Tasks
      
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
<<<<<<< HEAD
          // $('.response').css('display', 'none');
        }, 200);
        $scope.msg = '';

=======
          $('.response').css('opacity', 0);
        },200);
        $scope.msg = '';
>>>>>>> master
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
        dataToRemove = [
          {'id': data._id}
          ];
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
        mode: 'custom',
        scale: 'day',
        sortMode: undefined,
        maxHeight: false,
        width: true,
        autoExpand: 'both',
        taskOutOfRange: 'expand',
        fromDate: moment(Date.now()).subtract(2,'days'),
        toDate: moment(Date.now()).add(1,'months'),
        allowSideResizing: true,
        labelsEnabled: true,
        currentDate: 'column',
        currentDateValue: Date.now(),
        draw: false,
        readOnly: false,
        filterTask: '',
        filterRow: '',
        headersFormats: {
          'year': 'YYYY', 
          'quarter': '[Q]Q YYYY', 
          month: 'MMMM YYYY', 
          week: function(column) {
<<<<<<< HEAD
            return column.date.format('MMM Do [-]') + column.endDate.format('[ ]MMM Do');
            }, 
=======
            return column.date.format('MMM D [-]') + column.endDate.format('[ ]MMM D');
          },
>>>>>>> master
          day: 'ddd', 
          hour: 'H', 
          minute:'HH:mm'
        },
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
            // `data` attribute could have been used too.
            if($scope.authentication.user !== ''){

              $scope.load();

            };
            // Log various events to console
            api.scroll.on.scroll($scope, logScrollEvent);
            api.core.on.ready($scope, logReadyEvent);

            api.tasks.on.add($scope, addEventName('tasks.on.add', logTaskEvent));
            api.tasks.on.change($scope, addEventName('tasks.on.change', logTaskEvent));
            api.tasks.on.rowChange($scope, addEventName('tasks.on.rowChange', logTaskEvent));
            api.tasks.on.remove($scope, addEventName('tasks.on.remove', logTaskEvent));

            if (api.tasks.on.moveBegin) {
              api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', logTaskEvent));
              //api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
              api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', logTaskEvent));

              api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent));
              //api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
              api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', logTaskEvent));
            }

            api.rows.on.add($scope, addEventName('rows.on.add', logRowEvent));
            api.rows.on.change($scope, addEventName('rows.on.change', logRowEvent));
            api.rows.on.move($scope, addEventName('rows.on.move', logRowEvent));
            api.rows.on.remove($scope, addEventName('rows.on.remove', logRowEvent));

            api.side.on.resizeBegin($scope, addEventName('labels.on.resizeBegin', logLabelsEvent));
            //api.side.on.resize($scope, addEventName('labels.on.resize', logLabelsEvent));
            api.side.on.resizeEnd($scope, addEventName('labels.on.resizeEnd', logLabelsEvent));

            api.timespans.on.add($scope, addEventName('timespans.on.add', logTimespanEvent));
            api.columns.on.generate($scope, logColumnsGenerateEvent);

            api.rows.on.filter($scope, logRowsFilterEvent);
            api.tasks.on.filter($scope, logTasksFilterEvent);

            api.data.on.change($scope, function() {
              // $scope.live.row = $scope.data[5];
            });

            // Add some DOM events
            api.directives.on.new($scope, function(directiveName, directiveScope, element) {

              if (directiveName === 'ganttTask') {
                element.bind('click', function() {
                  logTaskEvent('task-clicked', directiveScope.task);

                });

              } else if (directiveName === 'ganttRow') {
                element.bind('click', function(evt) {
                  // logRowEvent('row-click', directiveScope.row); 
                  // $scope.options.draw = false
                  var data = directiveScope.row;

                  switch (SwitchViews.state) {
                    case 'Person':
                      assignment.personId = data.model.id;
                      break;
                    case 'Project':
                      assignment.projectId = data.model.id;
                      break;
                  }

                  $scope.triggerAssignModal();
                  var getDate = api.core.getDateByPosition(mouseOffset.getOffset(evt).x);
                  var taskBegin = moment(getDate).format();
                  assignment.startDate = moment(taskBegin).format();
                  var taskEnd = moment(assignment.startDate).add(7 , 'd');
                  assignment.endDate = moment(taskEnd).format();

                  $scope.drawTaskHandler = function(task){
                  
                    var taskParam = $scope.options.drawTaskFactory();
                    taskParam = {
                      id : task.id,
                      name: task.name,
                      from:assignment.startDate,
                      to: assignment.endDate,
                      color:'#81b208'
                    };

                    var uiItem = directiveScope.row.addTask(taskParam);
                    // uiItem.isResizing = true;
                    uiItem.updatePosAndSize();

                    directiveScope.row.updateVisibleTasks();
                    // directiveScope.row.$scope.$apply();
                  };

                });

              } else if (directiveName === 'ganttRowLabel') {
                element.bind('click', function() {
                  // logRowEvent('row-label-click', directiveScope.row);
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

      // Event handler
      var logScrollEvent = function(left, date, direction) {
        if (date !== undefined) {
          $log.info('[Event] api.on.scroll: ' + left + ', ' + (date === undefined ? 'undefined' : date.format()) + ', ' + direction);
        }
      };

        // Event handler
        var logTaskEvent = function(eventName, task) {
            $log.info('[Event] ' + eventName + ': ' + task.model.name);
        };

        // Event handler
        var logRowEvent = function(eventName, row) {
            $log.info('[Event] ' + eventName + ': ' + row.model.name);
        };

        // Event handler
        var logTimespanEvent = function(eventName, timespan) {
            $log.info('[Event] ' + eventName + ': ' + timespan.model.name);
        };

        // Event handler
        var logLabelsEvent = function(eventName, width) {
            $log.info('[Event] ' + eventName + ': ' + width);
        };

        // Event handler
        var logColumnsGenerateEvent = function(columns, headers) {
            $log.info('[Event] ' + 'columns.on.generate' + ': ' + columns.length + ' column(s), ' + headers.length + ' header(s)');
        };

        // Event handler
        var logRowsFilterEvent = function(rows, filteredRows) {
            $log.info('[Event] rows.on.filter: ' + filteredRows.length + '/' + rows.length + ' rows displayed.');
        };

        // Event handler
        var logTasksFilterEvent = function(tasks, filteredTasks) {
            $log.info('[Event] tasks.on.filter: ' + filteredTasks.length + '/' + tasks.length + ' tasks displayed.');
        };

        // Event handler
        var logReadyEvent = function() {
            $log.info('[Event] core.on.ready');
        };

      // Event utility function
      var addEventName = function(eventName, func) {
        return function(data) {
          return func(eventName, data);
        };
      };
    }
  ]);
