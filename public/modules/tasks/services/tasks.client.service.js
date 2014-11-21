'use strict';

//Tasks service used to communicate Tasks REST endpoints
angular.module('tasks').factory('Tasks', ['$resource',
  function($resource) {
    return $resource('tasks/:taskId', {
      taskId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

// Service to monitor the view we are in (Persons or Project)
angular.module('tasks').factory('SwitchViews', function($rootScope) {
  return {
    state: ''
  };
});

angular.module('tasks').service('Sample', function Sample() {
  return {
    getSampleData: function() {
      return {};
    },
    getSampleTimespans: function() {
      return {
        'timespan1': [{
          id: '1',
          from: new Date(2014, 9, 21, 8, 0, 0),
          to: new Date(2014, 11, 25, 15, 0, 0),
          name: 'Sprint 1 Timespan'
            //priority: undefined,
            //classes: [], //Set custom classes names to apply to the timespan.
            //data: undefined
        }]
      };
    },
  };
});

angular.module('tasks').service('Uuid', function Uuid() {
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
});
