'use strict';

//Verificationtokens service used to communicate Verificationtokens REST endpoints
angular.module('verificationtokens').factory('Verificationtokens', ['$resource',
	function($resource) {
		return $resource('verificationtokens/:verificationtokenId', { verificationtokenId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);