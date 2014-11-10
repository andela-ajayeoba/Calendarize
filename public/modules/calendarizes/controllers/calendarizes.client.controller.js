'use strict';

// Calendarizes controller
angular.module('calendarizes').controller('CalendarizesController', ['$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Apicall', 'Uuid', 'Sample', 'moment', 'GANTT_EVENTS',
	function($scope, $stateParams, $location, $timeout, Authentication, Apicall, Uuid, Sample, moment, GANTT_EVENTS ) {

		$scope.authentication = Authentication;

        $scope.addPerson = function() {
            var person = new Apicall.Persons($scope.person);

            person.$save(function(response) {
                $scope.msg = 'Person Successfully added';
                $scope.person = '';
                var newData = [
                    {'id': response._id, 'name': response.name, 'tasks': []}
                ];
                $scope.loadData(newData);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
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
                        $result.id = result._id;
                        $result.name = result.name;
                        $result.tasks = result.tasks;
                        data.push($result);                        
                    });

                $scope.loadData(data);
                console.log(data);
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
			// Create new Calendarize object
			console.log('fired');
			var project = new Apicall.Projects ($scope.project);
			console.log($scope.project);
			console.log(project);
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
            console.log(5555);
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
                    ASSIGNMENT CRUD
        ************************************************/
        // Creating a new Assignment
        $scope.createTask = function() {
            var task = new Apicall.Tasks ($scope.task);
            task.$save(function(response) {
                $scope.task = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.findOneTask = function() {
            $scope.task = Apicall.Tasks.get({ 
                // assignmentId: $stateParams.assignmentId
            });
        };
        $scope.updateTask = function() {
            var task = $scope.task ;

            task.$update(function() {
                // $location.path('calendarizes/' + calendarize._id);
                // Return a "Person updated" success message
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
            scale: 'day',
            maxHeight: false,
            width: false,
            autoExpand: 'both',
            taskOutOfRange: 'expand',
            fromDate: undefined,
            toDate: undefined,
            showLabelsColumn: true,
            currentDate: 'line',
            currentDateValue : new Date(2014, 9, 23, 11, 20, 0),
            draw: false,
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

        $scope.$on(GANTT_EVENTS.READY, function() {
            $scope.addSamples();
            $timeout(function() {
                $scope.scrollToDate($scope.options.currentDateValue);
            }, 0, true);
        });

        $scope.addSamples = function() {
            $scope.loadTimespans(Sample.getSampleTimespans().timespan1);
            $scope.loadData(Sample.getSampleData().data1);

        }; 

        $scope.removeSomeSamples = function() {
            $scope.removeData([
                {'id': 'c65c2672-445d-4297-a7f2-30de241b3145'}, // Remove all Kickoff meetings
                {'id': '2f85dbeb-0845-404e-934e-218bf39750c0', 'tasks': [
                    {'id': 'f55549b5-e449-4b0c-9f4b-8b33381f7d76'},
                    {'id': '5e997eb3-4311-46b1-a1b4-7e8663ea8b0b'},
                    {'id': '6fdfd775-7b22-42ec-a12c-21a64c9e7a9e'}
                ]}, // Remove some Milestones
                {'id': 'cfb29cd5-1737-4027-9778-bb3058fbed9c', 'tasks': [
                    {'id': '57638ba3-dfff-476d-ab9a-30fda1e44b50'}
                ]} // Remove order basket from Sprint 2
            ]);
        };

        $scope.removeSamples = function() {
            $scope.clearData();
        };

        var rowEvent = function(event, data) {
            if (!$scope.options.readOnly && $scope.options.draw) {
                // Example to draw task inside row
                if ((data.evt.target ? data.evt.target : data.evt.srcElement).className.indexOf('gantt-row') > -1) {
                    var startDate = data.date;
                    var endDate = moment(startDate);
                    //endDate.setDate(endDate.getDate());
                    var infoTask = {
                        id: Uuid.randomUuid(),  // Unique id of the task.
                        name: 'Drawn task', // Name shown on top of each task.
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
        $scope.$on(GANTT_EVENTS.TASK_DBL_CLICKED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_CONTEXTMENU, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_ADDED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_CHANGED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_REMOVED, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_MOVE_BEGIN, logTaskEvent);
        //$scope.$on(GANTT_EVENTS.TASK_MOVE, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_MOVE_END, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_RESIZE_BEGIN, logTaskEvent);
        //$scope.$on(GANTT_EVENTS.TASK_RESIZE, logTaskEvent);
        $scope.$on(GANTT_EVENTS.TASK_RESIZE_END, logTaskEvent);

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
                        to: new Date(2014, 9, 25, 15, 0, 0),
                        name: 'Sprint 1 Timespan'
                        //priority: undefined,
                        //classes: [], //Set custom classes names to apply to the timespan.
                        //data: undefined
                    }
                ]
            };
        }
    };
});
