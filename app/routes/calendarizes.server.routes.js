'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var calendarizes = require('../../app/controllers/calendarizes');

	// Routes to create and list projects
	
	app.route('/projects')
		.get(calendarizes.listProjects)
		.post(users.requiresLogin, calendarizes.createProject);

	// Routes to READ UPDATE and DELETE projects
	
	app.route('/projects/:projectId')
		.get(calendarizes.readProject)
		.put(users.requiresLogin, calendarizes.hasProjectAuthorization, calendarizes.updateProject)
		.delete(users.requiresLogin, calendarizes.hasProjectAuthorization, calendarizes.deleteProject);

	// Route to create and list workers
	
	app.route('/persons')
		.get(calendarizes.listPersons)
		.post(users.requiresLogin, calendarizes.createPerson);

	// Routes to update and delete workers
	
	app.route('/persons/:personId')
		.get(calendarizes.getPersonDetails)
		.put(users.requiresLogin, calendarizes.hasPersonAuthorization, calendarizes.updatePerson)
		.delete(users.requiresLogin, calendarizes.hasPersonAuthorization, calendarizes.deletePerson);


	// Assignment Routes
	
	app.route('/tasks')
		.get(users.requiresLogin, calendarizes.listTasks)
		.post(users.requiresLogin, calendarizes.createTask);

	// Routes to update and delete assignment
	
	app.route('/tasks/:taskId')
		.get(calendarizes.readTask)
		.put(users.requiresLogin, calendarizes.hasTaskAuthorization, calendarizes.updateTask)
		.delete(users.requiresLogin, calendarizes.hasTaskAuthorization, calendarizes.deleteTask);


	/* Middleware */

	app.param('projectId', calendarizes.projectByID);
	app.param('personId', calendarizes.personByID);
	app.param('taskId', calendarizes.taskByID);
};