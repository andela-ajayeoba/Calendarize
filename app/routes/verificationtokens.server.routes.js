'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var verificationtokens = require('../../app/controllers/verificationtokens.server.controller');

	// Verificationtokens Routes
	app.route('/verificationtokens')
		.get(verificationtokens.list)
		.post(users.requiresLogin, verificationtokens.create);

	app.route('/verificationtokens/:verificationtokenId')
		.get(verificationtokens.read)
		.put(users.requiresLogin, verificationtokens.hasAuthorization, verificationtokens.update)
		.delete(users.requiresLogin, verificationtokens.hasAuthorization, verificationtokens.delete);

	app.route('/verify/:token')
		.get(verificationtokens.verifyToken);

	// Finish by binding the Verificationtoken middleware
	app.param('verificationtokenId', verificationtokens.verificationtokenByID);
};
