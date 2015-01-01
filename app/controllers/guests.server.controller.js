'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Guest = mongoose.model('Guest'),
	Mailgun = require('mailgun-js'),
	User = mongoose.model('User'),
	_ = require('lodash');

var api_key = 'key-3c618b8023b0606df8a322e4986ff398';
var domain = 'sandbox13255ecc69fa45e1acb966e95b235586.mailgun.org';
var from_who = 'olusola.adenekan@andela.co';

/**
 * Create a Guest
 */
exports.createGuest = function(req, res) {
	var guest = new Guest(req.body);
	guest.user = req.user;
	guest.createGuestToken(function (err, token) {
	    if (err) {
	    	return res.status(400).send({
	    		message: errorHandler.getErrorMessage(err)
	    	});
	    }
			var mailgun = new Mailgun({apiKey: api_key, domain: domain});

		var data = {
			from: from_who,
			to: req.body.email,
			subject: 'Invitation',
			html: req.protocol + '://' + req.get('host') + '/guest/invitation/accept?token=' + guest.token
		};
		mailgun.messages().send(data);
	});

	guest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guest);
		}
	});
};

/**
 * Show the current Guest
 */
exports.readGuest = function(req, res) {
	res.jsonp(req.guest);
};

/**
 * Update a Guest
 */
exports.updateGuest = function(req, res) {
	var guest = req.guest ;

	guest = _.extend(guest , req.body);
	guest.createGuestToken(function (err, token) {
	    if (err) {
	    	return res.status(400).send({
	    		message: errorHandler.getErrorMessage(err)
	    	});
	    }
			var mailgun = new Mailgun({apiKey: api_key, domain: domain});

		var data = {
			from: from_who,
			to: guest.email,
			subject: 'Invitation',
			html: req.protocol + '://' + req.get('host') + '/guest/invitation/accept?token=' + guest.token
		};
		mailgun.messages().send(data);
	});

	guest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guest);
		}
	});
};

/**
 * Delete an Guest
 */
exports.deleteGuest = function(req, res) {
	var guest = req.guest ;
		guest.remove(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				User.findOne({guestId : guest._id}).exec(function(err, guestUser){
					if(guestUser){
						guestUser.remove();						
					}
				});
				res.jsonp(guest);
			}
		});
};

/**
 * Verify Guest
 */
exports.verifyGuest = function(req, res){
  Guest.findOne(req.query).exec(function(err, invitedGuest){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
				Guest.findById(invitedGuest._id).exec(function(err, guest) {
				var verifiedGuest = {
					isPending : false
				};
				guest = _.extend(guest , verifiedGuest);
				guest.save();
				res.redirect('/#!/guest/'+guest._id);
			});			
		}
  });
};

/**
 * List of Guests
 */
exports.listGuests = function(req, res) { 
	Guest.find().sort('-created').populate('user', 'username').exec(function(err, guests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(guests);
		}
	});
};

/**
 * Guest middleware
 */
exports.guestByID = function(req, res, next, id) { 
	Guest.findOne(req.query).populate('user', 'username').exec(function(err, guest) {
		if (err) return next(err);
		if (! guest) return next(new Error('Failed to load Guest ' + id));
		req.guest = guest ;
		next();
	});
};

/**
 * Guest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.guest.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
