'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'calendarize';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'gantt',
        'nsPopover'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('calendarizes');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Configuring the Articles module
angular.module('calendarizes').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Calendarizes', 'calendarizes', 'dropdown', '/calendarizes(/create)?');
    Menus.addSubMenuItem('topbar', 'calendarizes', 'List Calendarizes', 'calendarizes');
    Menus.addSubMenuItem('topbar', 'calendarizes', 'New Calendarize', 'calendarizes/create');
  }
]);'use strict';
//Setting up route
angular.module('calendarizes').config([
  '$stateProvider',
  function ($stateProvider) {
    // Calendarizes state routing
    $stateProvider.state('listWorkers', {
      url: '/workers',
      templateUrl: 'modules/calendarizes/views/list-workers.client.view.html'
    }).state('createWorker', {
      url: '/workers/create',
      templateUrl: 'modules/calendarizes/views/create-worker.client.view.html'
    }).state('viewWorker', {
      url: '/workers/:workerId',
      templateUrl: 'modules/calendarizes/views/view-worker.client.view.html'
    }).state('editWorker', {
      url: '/workers/:workerId/edit',
      templateUrl: 'modules/calendarizes/views/edit-worker.client.view.html'
    }).state('listProjects', {
      url: '/projects',
      templateUrl: 'modules/calendarizes/views/list-projects.client.view.html'
    }).state('createProject', {
      url: '/projects/create',
      templateUrl: 'modules/calendarizes/views/create-project.client.view.html'
    }).state('viewProject', {
      url: '/projects/:projectId',
      templateUrl: 'modules/calendarizes/views/view-project.client.view.html'
    }).state('editProject', {
      url: '/projects/:projectId/edit',
      templateUrl: 'modules/calendarizes/views/edit-project.client.view.html'
    }).state('listAssignments', {
      url: '/assignments',
      templateUrl: 'modules/calendarizes/views/list-assignments.client.view.html'
    }).state('createAssignment', {
      url: '/assignments/create',
      templateUrl: 'modules/calendarizes/views/create-assignment.client.view.html'
    }).state('viewAssignment', {
<<<<<<< HEAD
      url: '/tasks/:taskId',
      templateUrl: 'modules/calendarizes/views/view-assignment.client.view.html'
    }).state('editAssignment', {
      url: '/tasks/:taskId/edit',
=======
      url: '/assignments/:assignmentId',
      templateUrl: 'modules/calendarizes/views/view-assignment.client.view.html'
    }).state('editAssignment', {
      url: '/assignments/:assignmentId/edit',
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      templateUrl: 'modules/calendarizes/views/edit-assignment.client.view.html'
    }).state('projectsTimeline', {
      url: '/timeline/projects',
      templateUrl: 'modules/calendarizes/views/projects-view.client.view.html'
    }).state('workersTimeline', {
      url: '/timeline/workers',
      templateUrl: 'modules/calendarizes/views/workers-view.client.view.html'
    });
  }
]);'use strict';
// Calendarizes controller
angular.module('calendarizes').controller('CalendarizesController', [
  '$scope',
  '$stateParams',
  '$location',
  '$timeout',
  'Authentication',
  'Apicall',
  'Uuid',
  'Sample',
  'moment',
  'GANTT_EVENTS',
<<<<<<< HEAD
  '$modal',
  function ($scope, $stateParams, $location, $timeout, Authentication, Apicall, Uuid, Sample, moment, GANTT_EVENTS, $modal) {
    $scope.authentication = Authentication;
    // modal code begins
=======
  '$log',
  function ($scope, $modal, $stateParams, $location, $timeout, Authentication, Apicall, Uuid, Sample, moment, GANTT_EVENTS, $log) {
    $scope.authentication = Authentication;
    // Modal Test code
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    $scope.open = function (size) {
      var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'CalendarizesController',
          size: 'sm',
          resolve: {
<<<<<<< HEAD
            items: function () {
=======
            projects: function () {
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
              return $scope.projects;
            }
          }
        });
    };
<<<<<<< HEAD
    // Modal code ends 
=======
    //modal test ends 
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    /* Create a new person */
    $scope.addPerson = function () {
      var person = new Apicall.Persons($scope.person);
      person.$save(function (response) {
<<<<<<< HEAD
        alert('Person Successfully added');
        $scope.person = '';
        var newPerson = [{
=======
        $scope.msg = 'Person Successfully added';
        $scope.person = '';
        var newData = [{
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
              'id': response._id,
              'name': response.name,
              'tasks': []
            }];
<<<<<<< HEAD
        $scope.loadData(newPerson);
=======
        $scope.loadData(newData);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Person
    $scope.removePerson = function (person) {
      if (person) {
        person.$remove();
        for (var i in $scope.persons) {
          if ($scope.persons[i] === person) {
            $scope.persons.splice(i, 1);
          }
        }
      } else {
        $scope.person.$remove(function () {
        });
      }
    };
    $scope.updatePerson = function () {
      var person = $scope.person;
      person.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Persons
    $scope.findPersons = function () {
      var data = [];
      $scope.persons = Apicall.Persons.query({}, function () {
        $scope.persons.forEach(function (result) {
          var $result = {};
          $result.tasks = [];
          $result.id = result._id;
          $result.name = result.name;
          result.tasks.forEach(function (task) {
            var $task = {};
            $task.id = task._id;
            $task.name = task.projectName;
            $task.from = task.startDate;
            $task.to = task.endDate;
<<<<<<< HEAD
            $task.color = '#F1C232';
=======
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
            $result.tasks.push($task);
          });
          data.push($result);
        });
        $scope.loadData(data);
      });
    };
    $scope.findPersons();
    // Find existing Person
    $scope.findOnePerson = function () {
      $scope.person = Apicall.Persons.get({ personId: $stateParams.personId });
    };
    /************************************************
					PROJECTS CRUD
		************************************************/
    // Creating a new Project
    $scope.addProject = function () {
      // Create new Calendarize object
<<<<<<< HEAD
      console.log('fired');
      var project = new Apicall.Projects($scope.project);
      console.log(project);
=======
      var project = new Apicall.Projects($scope.project);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      // Redirect after save
      project.$save(function (response) {
        console.log('Project Successfully added');
        console.log(response);
        // Clear form fields
        $scope.project = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Project
    $scope.removeProject = function (project) {
      if (project) {
        project.$remove();
        for (var i in $scope.projects) {
          if ($scope.projects[i] === project) {
            $scope.projects.splice(i, 1);
          }
        }
      } else {
        $scope.project.$remove(function () {
        });
      }
    };
    // Update existing Calendarize
    $scope.updateProject = function () {
      var project = $scope.project;
      project.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Persons
    $scope.findProjects = function () {
<<<<<<< HEAD
=======
      console.log(5555);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      $scope.projects = Apicall.Projects.query();
    };
    //populate select option
    $scope.projectlist = {};
    // Find existing Person
    $scope.findOneProject = function () {
      $scope.project = Apicall.Projects.get({ projectId: $stateParams.projectId });
    };
    /************************************************
<<<<<<< HEAD
                    TASK CRUD
        ************************************************/
    // Creating a new Assignment/Task
    $scope.createTask = function (data) {
      var newTask = {};
      newTask.personId = data.row.id;
      newTask.projectId = '545b92e8b979bf90bef18397';
      newTask.startDate = data.date;
      newTask.endDate = moment(data.date).add(7, 'd');
      var task = new Apicall.Tasks(newTask);
      task.$save(function (response) {
        alert('Tasks successfully assigned');
        var taskParam = {};
        taskParam.id = response.projectId;
        taskParam.name = response.projectName;
        taskParam.from = response.startDate;
        taskParam.to = response.endDate;
        var drawTask = data.row.addTask(taskParam);
        $scope.$apply(function () {
          drawTask.updatePosAndSize();
          drawTask.row.updateVisibleTasks();
        });
=======
                    ASSIGNMENT CRUD
        ************************************************/
    // Creating a new Assignment
    $scope.createTask = function () {
      console.log('createtask');
      var task = new Apicall.Tasks($scope.task);
      task.$save(function (response) {
        $scope.task = '';
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.findOneTask = function () {
<<<<<<< HEAD
      $scope.task = Apicall.Tasks.get({ taskId: $stateParams.taskId });
      console.log($scope.task);
    };
    // $scope.updateTask = function() {
    //     var task = $scope.task ;
    //         task.$update(function() {
    //         }, function(errorResponse) {
    //             $scope.error = errorResponse.data.message;
    //         });
    // };
    $scope.updateTask = function (event, data) {
      var upTask = event.targetScope.task;
      var $task = Apicall.Tasks.get({ taskId: data.task.id });
      $stateParams.taskId = data.task.id;
      $task._id = data.task.id;
      $task.projectId = '545b92e8b979bf90bef18397';
      $task.personId = data.task.row.id;
      $task.startDate = data.task.getFromLabel();
      $task.endDate = data.task.getToLabel();
      console.log($task, $task.startDate, $task.endDate);
      $task.$update(function () {
        alert('Updated Successfully taskId');  // var taskParam = {};
                                               //     taskParam.id = response.projectId;
                                               //     taskParam.name = response.projectName;
                                               //     taskParam.from = response.startDate;
                                               //     taskParam.to = response.endDate;
                                               // var drawTask = data.row.addTask(taskParam);
                                               //     $scope.$apply(function() {
                                               //         drawTask.updatePosAndSize();
                                               //         drawTask.row.updateVisibleTasks();
                                               // });
=======
      $scope.task = Apicall.Tasks.get({});
    };
    $scope.updateTask = function () {
      var task = $scope.task;
      task.$update(function () {
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.findTasks = function () {
      $scope.tasks = Apicall.Tasks.query();
    };
    /************************************************
					TIMELIME
		************************************************/
    $scope.options = {
      mode: 'custom',
<<<<<<< HEAD
      scale: 'week',
=======
      scale: 'day',
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      maxHeight: false,
      width: false,
      autoExpand: 'both',
      taskOutOfRange: 'expand',
      fromDate: undefined,
      toDate: undefined,
      showLabelsColumn: true,
      currentDate: 'line',
      currentDateValue: new Date(2014, 9, 23, 11, 20, 0),
<<<<<<< HEAD
      draw: true,
=======
      draw: false,
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
      readOnly: false,
      filterTask: undefined,
      filterRow: undefined,
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
        'weekend': { working: false }
      },
      dateFrames: {
        'weekend': {
          evaluator: function (date) {
            return date.isoWeekday() === 6 || date.isoWeekday() === 7;
          },
          targets: ['weekend']
        }
      },
      timeFramesNonWorkingMode: 'visible',
      columnMagnet: '5 minutes'
    };
    $scope.$watch('fromDate+toDate', function () {
      $scope.options.fromDate = $scope.fromDate;
      $scope.options.toDate = $scope.toDate;
    });
    $scope.$watch('options.scale', function (newValue, oldValue) {
      if (!angular.equals(newValue, oldValue)) {
        if (newValue === 'quarter') {
          $scope.options.headersFormats = { 'quarter': '[Q]Q YYYY' };
          $scope.options.headers = ['quarter'];
        } else {
          $scope.options.headersFormats = undefined;
          $scope.options.headers = undefined;
        }
      }
    });
<<<<<<< HEAD
    // function that trigers modal onclick on the gantt chart cells
    $scope.$on(GANTT_EVENTS.ROW_CLICKED, function () {
      //show modal view 
      $scope.open();
      console.log('test');
    });
=======
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    $scope.$on(GANTT_EVENTS.READY, function () {
      $scope.addSamples();
      $timeout(function () {
        $scope.scrollToDate($scope.options.currentDateValue);
      }, 0, true);
    });
    $scope.addSamples = function () {
      $scope.loadTimespans(Sample.getSampleTimespans().timespan1);
<<<<<<< HEAD
      // $scope.loadData(Sample.getSampleData().data1);
      $scope.loadData($scope.findPersons());
    };
    $scope.removeSomeSamples = function () {
      $scope.removeData([]);
=======
      $scope.loadData(Sample.getSampleData().data1);
    };
    $scope.removeSomeSamples = function () {
      $scope.removeData([
        { 'id': 'c65c2672-445d-4297-a7f2-30de241b3145' },
        {
          'id': '2f85dbeb-0845-404e-934e-218bf39750c0',
          'tasks': [
            { 'id': 'f55549b5-e449-4b0c-9f4b-8b33381f7d76' },
            { 'id': '5e997eb3-4311-46b1-a1b4-7e8663ea8b0b' },
            { 'id': '6fdfd775-7b22-42ec-a12c-21a64c9e7a9e' }
          ]
        },
        {
          'id': 'cfb29cd5-1737-4027-9778-bb3058fbed9c',
          'tasks': [{ 'id': '57638ba3-dfff-476d-ab9a-30fda1e44b50' }]
        }
      ]);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    };
    $scope.removeSamples = function () {
      $scope.clearData();
    };
<<<<<<< HEAD
    var rowEvent = function (event, data) {
      if ($scope.options.draw) {
        // Example to draw task inside row
        if ((data.evt.target ? data.evt.target : data.evt.srcElement).className.indexOf('gantt-row') > -1) {
          var startDate = data.date;
          var endDate = moment(startDate).add(7, 'd');
          //endDate.setDate(endDate.getDate());
          var infoTask = {
              id: Uuid.randomUuid(),
              name: 'Assign Task',
=======
    var handleClickEvent = function (event, data) {
      $scope.open();
      if (!$scope.options.readOnly && $scope.options.draw) {
        // Example to draw task inside row
        if ((data.evt.target ? data.evt.target : data.evt.srcElement).className.indexOf('gantt-row') > -1) {
          var startDate = data.date;
          var endDate = moment(startDate);
          //endDate.setDate(endDate.getDate());
          var infoTask = {
              id: Uuid.randomUuid(),
              name: 'Drawn task',
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
              from: startDate,
              to: endDate,
              color: '#AA8833'
            };
          var task = data.row.addTask(infoTask);
          task.isCreating = true;
          $scope.$apply(function () {
            task.updatePosAndSize();
            data.row.updateVisibleTasks();
          });
        }
      }
    };
    var logScrollEvent = function (event, data) {
      if (angular.equals(data.direction, 'left')) {
        // Raised if the user scrolled to the left side of the Gantt. Use this event to load more data.
        console.log('Scroll event: Left ' + data.left);
      } else if (angular.equals(data.direction, 'right')) {
        // Raised if the user scrolled to the right side of the Gantt. Use this event to load more data.
        console.log('Scroll event: Right');
      }
    };
    var logTaskEvent = function (event, data) {
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
        } else if (property === 'row') {
          propertyValue = propertyValue.name;
        } else if (property === 'date') {
          propertyValue = propertyValue.format();
        }
        output += property + ': ' + propertyValue + '; ';
      }
      console.log('$scope.$on: ' + event.name + ': ' + output);
    };
    $scope.$on(GANTT_EVENTS.TASK_CLICKED, logTaskEvent);
<<<<<<< HEAD
    $scope.$on(GANTT_EVENTS.TASK_DBL_CLICKED, function (event, data) {
      console.log(data);
    });
=======
    $scope.$on(GANTT_EVENTS.TASK_DBL_CLICKED, logTaskEvent);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    $scope.$on(GANTT_EVENTS.TASK_CONTEXTMENU, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_ADDED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_CHANGED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_REMOVED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_MOVE_BEGIN, logTaskEvent);
<<<<<<< HEAD
    $scope.$on(GANTT_EVENTS.TASK_MOVE, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_MOVE_END, logTaskEvent);
    // update tasks
    $scope.$on(GANTT_EVENTS.TASK_RESIZE_BEGIN, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_RESIZE, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_RESIZE_END, $scope.updateTask);
=======
    //$scope.$on(GANTT_EVENTS.TASK_MOVE, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_MOVE_END, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_RESIZE_BEGIN, logTaskEvent);
    //$scope.$on(GANTT_EVENTS.TASK_RESIZE, logTaskEvent);
    $scope.$on(GANTT_EVENTS.TASK_RESIZE_END, logTaskEvent);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    $scope.$on(GANTT_EVENTS.COLUMN_CLICKED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.COLUMN_DBL_CLICKED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.COLUMN_CONTEXTMENU, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_MOUSEDOWN, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_MOUSEUP, logTaskEvent);
<<<<<<< HEAD
    $scope.$on(GANTT_EVENTS.ROW_CLICKED, function (event, data) {
      $scope.createTask(data);
    });
=======
    $scope.$on(GANTT_EVENTS.ROW_CLICKED, handleClickEvent);
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    $scope.$on(GANTT_EVENTS.ROW_DBL_CLICKED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_CONTEXTMENU, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_ORDER_CHANGED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_CHANGED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_ADDED, logTaskEvent);
    $scope.$on(GANTT_EVENTS.ROW_REMOVED, logTaskEvent);
<<<<<<< HEAD
    $scope.$on(GANTT_EVENTS.ROW_MOUSEDOWN, rowEvent);
=======
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
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
    $scope.$on(GANTT_EVENTS.ROWS_FILTERED, function (event, data) {
      console.log(data);
      console.log('$scope.$on: ' + event.name + ': ' + data.filteredRows.length + '/' + data.rows.length + ' rows displayed.');
    });
    $scope.$on(GANTT_EVENTS.TASKS_FILTERED, function (event, data) {
      console.log('$scope.$on: ' + event.name + ': ' + data.filteredTasks.length + '/' + data.tasks.length + ' tasks displayed.');
    });
  }
<<<<<<< HEAD
]).controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.ok = function () {
    $modalInstance.close();
  };
}).service('Uuid', function Uuid() {
=======
]).service('Uuid', function Uuid() {
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
  return {
    s4: function () {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    },
    randomUuid: function () {
      return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }
  };
}).service('Sample', function Sample() {
  return {
    getSampleData: function () {
      return {};
    },
    getSampleTimespans: function () {
      return {
        'timespan1': [{
            id: '1',
            from: new Date(2014, 9, 21, 8, 0, 0),
<<<<<<< HEAD
            to: new Date(2014, 11, 25, 15, 0, 0),
=======
            to: new Date(2014, 9, 25, 15, 0, 0),
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
            name: 'Sprint 1 Timespan'
          }]
      };
    }
  };
<<<<<<< HEAD
=======
}).controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  $scope.ok = function () {
    $modalInstance.close($scope.projects);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
});'use strict';
angular.module('calendarizes').controller('WorkersController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Apicall',
  function ($scope, $stateParams, $location, Authentication, Apicall) {
    $scope.authentication = Authentication;
    $scope.workers = [];
    $scope.worker = {};
    $scope.assignments = Apicall.Assignments.query();
    $scope.addWorker = function () {
      // Create new Worker object
      var worker = new Apicall.Workers($scope.worker);
      // Redirect after save
      worker.$save(function (response) {
        $scope.workers.push(response);
        // $scope.workers.unshift(worker);				
        // $location.path('calendarizes/' + response._id);
        $scope.msg = 'Worker Successfully added';
        // Clear form fields
        $scope.worker = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.removeAssignment = function (i) {
      $scope.assignments[i].splice(0, 1);
    };
    $scope.updateWorker = function () {
      var worker = $scope.worker;
      worker.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.selectWorker = function (worker) {
      $scope.worker = worker;
    };
    $scope.assignProject = function () {
      var assignment = new Apicall.Assignments({
          project: this.project,
          worker: this.worker,
          startDate: this.startDate,
          endDate: this.endDate,
          user: this.user,
          created: this.created
        });
      assignment.$save(function (response) {
        $scope.assignments.push(response);
      });
    };
  }
]);'use strict';
// Projects controller
angular.module('calendarizes').controller('ProjectsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Apicall',
  function ($scope, $stateParams, $location, Authentication, Apicall) {
    $scope.authentication = Authentication;
    // Create new Project
    $scope.addProject = function () {
      var project = new Apicall.Projects($scope.project);
      // Redirect after save
      project.$save(function (response) {
        // $location.path('calendarizes/' + response._id);
        // $scope.msg = 'Project Successfully added';
        console.log(response);
        // Clear form fields
        $scope.project = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Project
    $scope.removeProject = function (project) {
      if (project) {
        project.$remove();
        for (var i in $scope.projects) {
          if ($scope.projects[i] === project) {
            $scope.projects.splice(i, 1);
          }
        }
      } else {
        $scope.project.$remove(function () {
        });
      }
    };
    // Update existing Calendarize
    $scope.updateProject = function () {
      var project = $scope.project;
      project.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Workers
    $scope.findProjects = function () {
      $scope.projects = Apicall.Projects.query();
    };
    // Find existing Worker
    $scope.findOneProject = function () {
      $scope.project = Apicall.Projects.get({ projectId: $stateParams.projectId });
    };
    //inactivate a project
    $scope.inactivateProject = function () {
      var project = $scope.project;
      project.isactive = false;
      project.$update(function () {
        $location.path('projects/' + project._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //activate inactivated project
    $scope.inactivateProject = function () {
      var project = $scope.project;
      project.isactive = true;
      project.$update(function () {
        $location.path('projects/' + project._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);// 'use strict';
// angular.module('calendarizes').directive('custompopover', [
// 	return {
//         restrict: 'E',
//         templateUrl: 'popover.html',  
//     };
// ]);
'use strict';
//Calendarizes service used to communicate Calendarizes REST endpoints
// angular.module('calendarizes').factory('Calendarizes', ['$resource',
// 	function($resource) {
// 		return $resource('calendarizes/:calendarizeId', { calendarizeId: '@_id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);
angular.module('calendarizes').factory('Apicall', [
  '$resource',
  function ($resource) {
    return {
      Persons: $resource('persons/:personId', { personId: '@_id' }, { update: { method: 'PUT' } }),
      Projects: $resource('projects/:projectId', { projectId: '@_id' }, { update: { method: 'PUT' } }),
<<<<<<< HEAD
      Tasks: $resource('tasks/:taskId', { taskId: '@_id' }, { update: { method: 'PUT' } })
=======
      Tasks: $resource('tasks/:taskId', { projectId: '@_id' }, { update: { method: 'PUT' } })
>>>>>>> ba0d61aa9ecb55de80fc88701947bfbf82ff7076
    };
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;  // console.log($scope.authentication.user);
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);