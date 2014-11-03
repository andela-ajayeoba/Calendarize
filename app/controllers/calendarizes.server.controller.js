'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Calendarize = mongoose.model('Calendarize'),
	Project = mongoose.model('Project'),
	Workers = mongoose.model('Workers'),
	Assignment = mongoose.model('Assignment'),
	_ = require('lodash');

/**
 * Calendarize authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.calendarize.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/*****************************************
	PROJECT CONTROLLER
*****************************************/

/* CREATING A PROJECT */

exports.createProject = function(req, res) {
	var project = new Project(req.body);
	project.user = req.user;

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/* LISTING PROJECTS */

exports.listProject = function(req, res) { Project.find().sort('-created').populate('user', 'displayName').exec(function(err, projects) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(projects);
		}
	});
};

/* UPDATE ROJECTS */
exports.updateProject = function(req, res) {
	var project = req.project;

	project = _.extend(project , req.body);

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/* READ THE CURRENT PROJECT */
exports.readProject = function(req, res) {
	res.jsonp(req.project);
};


/* DELETE PROJECTS */
exports.deleteProject = function(req, res) {
	var project = req.project ;

	project.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/* UPDATE PROJECTS ARRAY */
exports.updateProjectPeople = function(req, res) {
	var project = Project.findById(req.body.projectId).exec(function(err, project) {
		if (err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
			else{
				project.people.push(req.worker);
				project.save(function(err) {
					if (err) {
							return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.jsonp(project);
					}
				});
			}
		});	
};

exports.updateProjectCall = function(req, res){

	var worker = req.body.workerId;
	var project = req.project;

	project.people.push(worker);
	project.save(function(err) {
					if (err) {
							return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
				} else {
						res.jsonp(project);
					}
				});

};


exports.projectByID = function(req, res, next, id) { Project.findById(id).populate('user', 'displayName').exec(function(err, project) {
		if (err) return next(err);
		if (! project) return next(new Error('Failed to load Project ' + id));
		req.project = project ;
		next();
	});
};



/*****************************************
	WORKERS CONTROLLER
/*****************************************/

/* CREATING A WORKER */
exports.createWorkers = function(req, res) {
	var workers = new Workers(req.body);
	workers.user = req.user;

	workers.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(workers);
		}
	});
};

/* LISTING WORKERS */
exports.listWorkers = function(req, res) { Workers.find().sort('-created').populate('user', 'displayName').exec(function(err, workers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(workers);
		}
	});
};

/* WORKERS MIDDLEWARE (:workersId) */
exports.workerByID = function(req, res, next, id) { Workers.findById(id).populate('user', 'displayName').exec(function(err, worker) {
		if (err) return next(err);
		if (! worker) return next(new Error('Failed to load Worker ' + id));
		req.worker = worker ;
		next();
	});
};

/* GET WORKERS DETAILS */
exports.getWorkersDetails = function(req, res) {
	res.jsonp(req.worker);
};


/* DELETE WORKER */
exports.deleteWorker = function(req, res) {
	var worker = req.worker ;

	worker.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(worker);
		}
	});
};

/* UPDATE WORKER */
exports.updateWorker = function(req, res) {
	var worker = req.worker;

	worker = _.extend(worker , req.body);

	worker.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(worker);
		}
	});
};

/* GET WORKERS PROJECTS */
exports.getWorkerProjects = function(req, res){

	Project.where('people').equals(req.worker._id).exec(
		function(err, data){
			if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(data);
		}

		}
	);

};

/*****************************************
	ASSIGNMENT CONTROLLER
/*****************************************/

/* CREATE ASSIGNMENT */
exports.newAssignment = function(req, res) {
	var assignment = new Assignment(req.body);
	assignment.user = req.user;

	assignment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignment);
		}
	});
};

/* LIST ASSIGNMENTS */
exports.listAssignments = function(req, res) { Assignment.find().sort('-created').populate('worker', 'name').populate('project', 'projectname').exec(function(err, assignments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignments);
		}
	});
};

/* READ THE CURRENT ASSIGNMENT */
exports.readAssignment = function(req, res) {
	res.jsonp(req.assignment);
};

/* ASSIGNMENT MIDDLEWARE (:assignmentId) */
exports.assignmentByID = function(req, res, next, id) { Assignment.findById(id).populate('user', 'displayName').exec(function(err, assignment) {
		if (err) return next(err);
		if (! assignment) return next(new Error('Failed to load Assignment' + id));
		req.assignment = assignment;
		next();
	});
};


/* DELETE ASSIGNMENT */
exports.deleteAssignment = function(req, res) {
	var assignment = req.assignment ;

	assignment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignment);
		}
	});
};

/* UPDATE ASSIGNMENT */
exports.updateAssignment = function(req, res) {
	var assignment = req.assignment ;

	assignment = _.extend(assignment, req.body);

	assignment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignment);
		}
	});
};
