'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var calendarizes = require('../../app/controllers/calendarizes');

	// Routes to create and list projects
	app.route('/projects')
		.get(calendarizes.listProject)
		.post(users.requiresLogin, calendarizes.createProject);

	// Routes to READ UPDATE and DELETE projects
	app.route('/projects/:projectId')
		.get(calendarizes.readProject)
		.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.updateProject)
		.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.deleteProject);

	// Updates people project with the current worker
	app.route('/projects/:projectId/assign')
		.get(users.requiresLogin, calendarizes.listProject)
	 	.post(users.requiresLogin, calendarizes.updateProjectCall);	

	// Route to create and list workers
	app.route('/workers')
		.get(calendarizes.listWorkers)
		.post(users.requiresLogin, calendarizes.createWorkers);

	// Routes to update and delete workers
	app.route('/workers/:workerId')
		.get(calendarizes.getWorkersDetails)
		.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.updateWorker)
		.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.deleteWorker);


	// Updates people project with the current worker
	app.route('/workers/:workerId/assign')
		.get(users.requiresLogin, calendarizes.getWorkerProjects)
	 	.post(users.requiresLogin, calendarizes.updateProjectPeople);


	// Assignment Routes
	app.route('/assignments')
		.get(users.requiresLogin, calendarizes.listAssignments)
		.post(users.requiresLogin, calendarizes.newAssignment);

	// Routes to update and delete assignment
	app.route('/assignments/:assignmentId')
		.get(calendarizes.readAssignment)
		.put(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.updateAssignment)
		.delete(users.requiresLogin, calendarizes.hasAuthorization, calendarizes.deleteAssignment);

// MIDDLEWARE

	app.param('projectId', calendarizes.projectByID);
	app.param('workerId', calendarizes.workerByID);
	app.param('assignmentId', calendarizes.workerByID);
};