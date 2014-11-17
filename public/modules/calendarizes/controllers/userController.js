'use strict';
angular.module('calendarizes').controller('userLoginController', function($scope, $rootScope) {
    $scope.user = {};

    $scope.authenticate = function() {
        $rootScope.$broadcast('login');
    };
});
