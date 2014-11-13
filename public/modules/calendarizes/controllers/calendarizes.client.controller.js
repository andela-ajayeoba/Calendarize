'use strict';
// Calendarizes controller
angular.module('calendarizes').controller('CalendarizesController', ['$scope','$stateParams', '$location', '$timeout','Authentication', 'Apicall','Uuid', 'Sample', 'moment', 'GANTT_EVENTS','$modal', 
	function($scope,$stateParams, $location, $timeout, Authentication, Apicall, Uuid, Sample, moment, GANTT_EVENTS,$modal) {
		$scope.authentication = Authentication;
        // modal code begins
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'CalendarizesController',
                    size:'sm',
                resolve: {
                    items: function () {
                     return $scope.projects;
                }
              }
            });
        }; 
        
		// Modal code ends 
        /* Create a new person */
        $scope.addPerson = function() {
            var person = new Apicall.Persons($scope.person);
            person.$save(function(response) {
                 alert('Person Successfully added');
                $scope.person = '';
                var newPerson = [
                    {'id': response._id, 'name': response.name, 'tasks': []}
                ];
                $scope.loadData(newPerson);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
		// Remove existing Person
		$scope.removePerson = function( person ) {
			if ( person ) { person.$remove();
				for (var i in $scope.persons) {
					if ($scope.persons [i] === person ) {
						$scope.persons.splice(i, 1);
					}
				}
			} else {
				$scope.person.$remove(function() {
				});
			}
		};

		$scope.updatePerson = function() {
			var person = $scope.person ;
			person.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};			

		// Find a list of Persons
		$scope.findPersons = function() {

            var data = [];
    		$scope.persons = Apicall.Persons.query({}, function(){
                  $scope.persons.forEach(function(result){
                    var $result = {};
                        $result.tasks = [];
                        $result.id = result._id;
                        $result.name = result.name;
                        result.tasks.forEach(function(task){
                            var $task = {};
                                $task.id = task._id;
                                $task.name = task.projectName;
                                $task.from = task.startDate;
                                $task.to = task.endDate;
                                $task.color = '#F1C232';
                                $result.tasks.push($task);
                        });
                        data.push($result);                        
                    });
                $scope.loadData(data);
            });
        };
        $scope.findPersons();
		// Find existing Person
		$scope.findOnePerson = function() {
			$scope.person = Apicall.Persons.get({ 
				personId: $stateParams.personId
			});
		};
		/************************************************
					PROJECTS CRUD
		************************************************/

		// Creating a new Project
		$scope.addProject = function() {
			// Create new Calendarize Project Object
			var project = new Apicall.Projects($scope.project);
			// Redirect after save
			project.$save(function(response) {
				console.log('Project Successfully added');
				console.log(response);
				// Clear form fields
				$scope.project = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Remove existing Project
		$scope.removeProject = function(project) {
			if (project) { project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project ) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
				});
			}
		};

		// Update existing Calendarize
		$scope.updateProject = function() {
			var project = $scope.project ;

			project.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};			

		// Find a list of Persons
		$scope.findProjects = function() {
			$scope.projects = Apicall.Projects.query();
		};


        //populate select option
        $scope.projectlist = {};

		// Find existing Person
		$scope.findOneProject = function() {
			$scope.project = Apicall.Projects.get({ 
				projectId: $stateParams.projectId
			});
		};

        /************************************************
                    TASK CRUD
        ************************************************/
        // Creating a new Assignment/Task
        $scope.createTask = function(data) {

            var newTask = {};
                newTask.personId = data.row.id;
                newTask.projectId = '545b92e8b979bf90bef18397';
                newTask.startDate = data.date;
                newTask.endDate = moment(data.date).add( 7 , 'd');

            var task = new Apicall.Tasks(newTask);
                task.$save(function(response) {
                    alert('Tasks successfully assigned');
                        var taskParam = {};
                            taskParam.id = response.projectId;
                            taskParam.name = response.projectName;
                            taskParam.from = response.startDate;
                            taskParam.to = response.endDate;
                        var drawTask = data.row.addTask(taskParam);
                            $scope.$apply(function() {
                                drawTask.updatePosAndSize();
                                drawTask.row.updateVisibleTasks();
                            });

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.findOneTask = function() {
            $scope.task = Apicall.Tasks.get({ 
                 taskId: $stateParams.taskId
            });

            console.log($scope.task);
        };

        $scope.updateTask = function(event, data) {
            var upTask = event.targetScope.task;
            var $task = Apicall.Tasks.get({ taskId: data.task.id});
            
                    $stateParams.taskId = data.task.id;
                    $task._id = data.task.id;
                    $task.projectId = '545b92e8b979bf90bef18397';
                    $task.personId = data.task.row.id;
                    $task.startDate = data.task.getFromLabel();
                    $task.endDate = data.task.getToLabel();
                    console.log($task, $task.startDate, $task.endDate);
                    $task.$update(function() {
                        alert('Updated Successfully taskId');
                        // var taskParam = {};
                        //     taskParam.id = response.projectId;
                        //     taskParam.name = response.projectName;
                        //     taskParam.from = response.startDate;
                        //     taskParam.to = response.endDate;
                        // var drawTask = data.row.addTask(taskParam);
                        //     $scope.$apply(function() {
                        //         drawTask.updatePosAndSize();
                        //         drawTask.row.updateVisibleTasks();
                            // });
               }, function(errorResponse) {
                   $scope.error = errorResponse.data.message;
               });
       };

        $scope.findTasks = function() {
            $scope.tasks = Apicall.Tasks.query();
        };


		/************************************************
					TIMELIME
		************************************************/

		$scope.options = {
            mode: 'custom',
            scale: 'week',
            maxHeight: false,
            width: false,
            autoExpand: 'both',
            taskOutOfRange: 'expand',
            fromDate: undefined,
            toDate: undefined,
            showLabelsColumn: true,
            currentDate: 'line',
            currentDateValue : new Date(2014, 9, 23, 11, 20, 0),
            draw: true,
            readOnly: false,
            filterTask: undefined,
            filterRow: undefined,
            allowLabelsResizing: true,
            timeFrames:
                 {'day': {
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
                    $scope.options.headersFormats = {'quarter': '[Q]Q YYYY'};
                    $scope.options.headers = ['quarter'];
                } else {
                    $scope.options.headersFormats = undefined;
                    $scope.options.headers = undefined;
                }
            }
        });

        // function that trigers modal onclick on the gantt chart cells 
       $scope.$on(GANTT_EVENTS.ROW_CLICKED, function(){
        	//show modal view 
            console.log('test');	  
       	});
        
        $scope.$on(GANTT_EVENTS.READY, function() {
            $scope.addSamples();
            $timeout(function() {
                $scope.scrollToDate($scope.options.currentDateValue);
            }, 0, true);
        });

        $scope.addSamples = function() {
            $scope.loadTimespans(Sample.getSampleTimespans().timespan1);
            // $scope.loadData(Sample.getSampleData().data1);
            $scope.loadData($scope.findPersons());

        }; 

        $scope.removeSomeSamples = function() {
            $scope.removeData([
                
            ]);
        };

        $scope.removeSamples = function() {
            $scope.clearData();
        };

        var rowEvent = function(event, data) {
            $scope.open();
            if ($scope.options.draw) {
                // Example to draw task inside row
                if ((data.evt.target ? data.evt.target : data.evt.srcElement).className.indexOf('gantt-row') > -1) {
                    var startDate = data.date;
                    var endDate = moment(startDate).add( 7, 'd');
                    //endDate.setDate(endDate.getDate());
                    var infoTask = {
                        id: Uuid.randomUuid(),  // Unique id of the task.
                        name: 'Assign Task', // Name shown on top of each task.
                        from: startDate, // Date can be a String, Timestamp or Date object.
                        to: endDate,// Date can be a String, Timestamp or Date object.
                        color: '#AA8833' // Color of the task in HEX format (Optional).
                    };
                    var task = data.row.addTask(infoTask);
                    task.isCreating = true;
                    $scope.$apply(function() {
                        task.updatePosAndSize();
                        data.row.updateVisibleTasks();
                    });
                }
            }
        };

        var logScrollEvent = function(event, data) {
            if (angular.equals(data.direction, 'left')) {
                // Raised if the user scrolled to the left side of the Gantt. Use this event to load more data.
                console.log('Scroll event: Left ' + data.left);
            } else if (angular.equals(data.direction, 'right')) {
                // Raised if the user scrolled to the right side of the Gantt. Use this event to load more data.
                console.log('Scroll event: Right');
            }
        };

        var logTaskEvent = function(event, data) {
            // A task event has occured.
            var output = '';
            for (var property in data) {
                var propertyValue = data[property];
                if (property === 'evt' && propertyValue) {
                    propertyValue = propertyValue.type;
                } else if (property === 'element' && propertyValue.length > 0) {
                    propertyValue = propertyValue[0].localName + (propertyValue[0].className ? '.' + propertyValue[0].className : '');
                } else if (property === 'task') {
                    propertyValue = propertyValue.name;
                } else if (property === 'timespan') {
                    propertyValue = propertyValue.name;
                } else if (property === 'column') {
                    propertyValue = propertyValue.date.format() + ' <---> ' + propertyValue.endDate.format();
                }  else if (property === 'row') {
                    propertyValue = propertyValue.name;
                } else if (property === 'date') {
                    propertyValue = propertyValue.format();
                }
                output += property + ': ' + propertyValue +'; ';
            }
            console.log('$scope.$on: ' + event.name + ': ' + output);
        };
        $scope.$on(GANTT_EVENTS.TASK_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_DBL_CLICKED, function(event, data) {
            console.log(data);
        });
        $scope.$on(GANTT_EVENTS.TASK_CONTEXTMENU, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_ADDED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_CHANGED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_REMOVED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_MOVE_BEGIN, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_MOVE, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_MOVE_END, logTaskEvent);
            // update tasks
        $scope.$on(GANTT_EVENTS.TASK_RESIZE_BEGIN, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_RESIZE, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_RESIZE_END, $scope.updateTask);

        $scope.$on(GANTT_EVENTS.COLUMN_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.COLUMN_DBL_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.COLUMN_CONTEXTMENU, logTaskEvent);

        $scope.$on(GANTT_EVENTS.ROW_MOUSEDOWN, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_MOUSEUP, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_CLICKED, logTaskEvent);

        $scope.$on(GANTT_EVENTS.ROW_DBL_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_CONTEXTMENU, logTaskEvent);

        $scope.$on(GANTT_EVENTS.ROW_ORDER_CHANGED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_CHANGED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_ADDED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_REMOVED, logTaskEvent);

        $scope.$on(GANTT_EVENTS.ROW_MOUSEDOWN, rowEvent);

        $scope.$on(GANTT_EVENTS.ROW_LABEL_MOUSEDOWN, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_LABEL_MOUSEUP, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_LABEL_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_LABEL_DBL_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_LABEL_CONTEXTMENU, logTaskEvent);

        $scope.$on(GANTT_EVENTS.ROW_HEADER_MOUSEDOWN, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_HEADER_MOUSEUP, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_HEADER_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_HEADER_DBL_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.ROW_HEADER_CONTEXTMENU, logTaskEvent);

        $scope.$on(GANTT_EVENTS.ROW_LABELS_RESIZED, logTaskEvent);

        $scope.$on(GANTT_EVENTS.TIMESPAN_ADDED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TIMESPAN_CHANGED, logTaskEvent);

        $scope.$on(GANTT_EVENTS.READY, logTaskEvent);
        $scope.$on(GANTT_EVENTS.SCROLL, logScrollEvent);

        $scope.$on(GANTT_EVENTS.ROWS_FILTERED, function(event, data) {
            console.log(data);
            console.log('$scope.$on: ' + event.name + ': ' + data.filteredRows.length + '/' +  data.rows.length + ' rows displayed.');
        });
        $scope.$on(GANTT_EVENTS.TASKS_FILTERED, function(event, data) {
            console.log('$scope.$on: ' + event.name + ': ' + data.filteredTasks.length + '/' + data.tasks.length + ' tasks displayed.');
        });

	}
])
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.ok = function () {
            $modalInstance.close();
        };      
    })
    .service('Uuid', function Uuid() {
        return {
            s4: function() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },
            randomUuid: function() {
                return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                    this.s4() + '-' + this.s4() + this.s4() + this.s4();
            }
        };
    })
    .service('Sample', function Sample() {
        return {
            getSampleData: function() {
                return {
                    };
            },
            getSampleTimespans: function() {
                return {
                    'timespan1': [
                        {
                            id: '1',
                            from: new Date(2014, 9, 21, 8, 0, 0),
                            to: new Date(2014, 11, 25, 15, 0, 0),
                            name: 'Sprint 1 Timespan'
                            //priority: undefined,
                            //classes: [], //Set custom classes names to apply to the timespan.
                            //data: undefined
                       }
                    ]
                };    
            },  
        };
    });
