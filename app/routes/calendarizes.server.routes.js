'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var calendarizes = require('../../app/controllers/calendarizes');

	// Calendarizes Routes
	app.route('/calendarizes')
		.get(calendarizes.list)
		.post(users.requiresLogin, calendarizes.create);

	app.route('/calendarizes/:calendarizeId')
		.get(calendarizes.read)
		.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.update)
		.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.delete);

	// Finish by binding the Calendarize middleware
	app.param('calendarizeId', calendarizes.calendarizeByID);
};