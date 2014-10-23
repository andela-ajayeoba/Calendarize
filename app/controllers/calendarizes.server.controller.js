'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Calendarize = mongoose.model('Calendarize'),
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