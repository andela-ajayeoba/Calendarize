'use strict';

//Setting up route
angular.module('verificationtokens').config(['$stateProvider',
	function($stateProvider) {
		// Verificationtokens state routing
		$stateProvider.
		state('listVerificationtokens', {
			url: '/verificationtokens',
			templateUrl: 'modules/verificationtokens/views/list-verificationtokens.client.view.html'
		}).
		state('createVerificationtoken', {
			url: '/verificationtokens/create',
			templateUrl: 'modules/verificationtokens/views/create-verificationtoken.client.view.html'
		}).
		state('viewVerificationtoken', {
			url: '/verificationtokens/:verificationtokenId',
			templateUrl: 'modules/verificationtokens/views/view-verificationtoken.client.view.html'
		}).
		state('editVerificationtoken', {
			url: '/verificationtokens/:verificationtokenId/edit',
			templateUrl: 'modules/verificationtokens/views/edit-verificationtoken.client.view.html'
		});
	}
]);