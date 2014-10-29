'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Calendarize = mongoose.model('Calendarize'),
	Project = mongoose.model('Project'),
	Workers = mongoose.model('Workers'),
	// Assignment = mongoose.model('Assignment'),
	_ = require('lodash');

/**
 * Create a Calendarize
 */
exports.create = function(req, res) {
	var calendarize = new Calendarize(req.body);
	calendarize.user = req.user;

	calendarize.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(calendarize);
		}
	});
};

/**
 * Show the current Calendarize
 */
exports.read = function(req, res) {
	res.jsonp(req.calendarize);
};

/**
 * Update a Calendarize
 */
exports.update = function(req, res) {
	var calendarize = req.calendarize ;

	calendarize = _.extend(calendarize , req.body);

	calendarize.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(calendarize);
		}
	});
};

/**
 * Delete an Calendarize
 */
exports.delete = function(req, res) {
	var calendarize = req.calendarize ;

	calendarize.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(calendarize);
		}
	});
};

/**
 * List of Calendarizes
 */
exports.list = function(req, res) { Calendarize.find().sort('-created').populate('user', 'displayName').exec(function(err, calendarizes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(calendarizes);
		}
	});
};

/**
 * Calendarize middleware
 */
exports.calendarizeByID = function(req, res, next, id) { Calendarize.findById(id).populate('user', 'displayName').exec(function(err, calendarize) {
		if (err) return next(err);
		if (! calendarize) return next(new Error('Failed to load Calendarize ' + id));
		req.calendarize = calendarize ;
		next();
	});
};

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
/*****************************************/

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




exports.projectByID = function(req, res, next, id) { Project.findById(id).populate('user', 'displayName').exec(function(err, project) {
		if (err) return next(err);
		if (! project) return next(new Error('Failed to load Worker ' + id));
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

/*****************************************
	WORKERS CONTROLLER
/*****************************************/

/* ASSIGNMENT */
// exports.assignment = function(req, res){

// 		var assignment = new Assignment(req.body);
// 			// assignment.worker = req.worker.name;
// 			// assignment.project.u(req.body.project);

// 		assignment.save(function(err){
// 			if(err){
// 				return res.status(400).send({
// 					message: errorHandler.getErrorMessage(err)
// 				});

// 			}else {
// 				res.jsonp(assignment);
// 			}
// 		});

// 	};

exports.calendarizeByID = function(req, res, next, id) { Calendarize.findById(id).populate('user', 'displayName').exec(function(err, calendarize) {
		if (err) return next(err);
		if (! calendarize) return next(new Error('Failed to load Calendarize ' + id));
		req.calendarize = calendarize ;
		next();
	});
};