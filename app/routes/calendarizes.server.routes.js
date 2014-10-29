'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var calendarizes = require('../../app/controllers/calendarizes');

	// Calendarizes Routes
	app.route('/calendarizes')
		.get(calendarizes.list)
		.post(users.requiresLogin, calendarizes.create);

	// Routes to create and list projects
	app.route('/projects')
		.get(calendarizes.listProject)
		.post(users.requiresLogin, calendarizes.createProject);

	// Routes to READ UPDATE and DELETE projects
	app.route('/projects/:projectId')
		.get(calendarizes.readProject)
		.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.updateProject)
		.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.deleteProject);	

	// Route to create and list workers
	app.route('/workers')
		.get(calendarizes.listWorkers)
		.post(users.requiresLogin, calendarizes.createWorkers);

	// Routes to update and delete workers
	app.route('/workers/:workerId')
		.get(calendarizes.getWorkersDetails)
		.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.updateWorker)
		.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.deleteWorker);

	// app.route('/workers/:workerId/assign')
	// 	.get(calendarizes.getWorkersProjects)
	// 	.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.updateProjectWorkers);
	// app.route('/calendarizes/:calendarizeId')
	// 	.get(calendarizes.read)
	// 	.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.update)
	// 	.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.delete);

	// Finish by using the the respective middleware
	app.param('calendarizeId', calendarizes.calendarizeByID);
	app.param('projectId', calendarizes.projectByID);
	app.param('workerId', calendarizes.workerByID);
};