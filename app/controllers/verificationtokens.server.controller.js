'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	user = require('../../app/controllers/users'),
	Verificationtoken = mongoose.model('Verificationtoken'),
	User = mongoose.model('User'),
	_ = require('lodash');


/**
 * Show the current Verificationtoken
 */
exports.read = function(req, res) {
	res.jsonp(req.verificationtoken);
};


/**
 * List of Verificationtokens
 */
exports.list = function(req, res) { 
	Verificationtoken.find().sort('-created').populate('user', 'displayName').exec(function(err, verificationtokens) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(verificationtokens);
		}
	});
};



var verifyUser = function(token, done) {
    Verificationtoken.findOne({token: token}, function (err, doc){
        if (err) {
        	return done(err);
        }
        if (doc) {
	        User.findOne({_id: doc._userId}, function (err, user) {
	            if (err) return done(err);
	            user['verified'] = true;
	            user.save(function(err) {
	              return done(err);
	            });
	        });
    	}
    	else{
    		return done(new Error('Token not found'));
    	}
    });
};

exports.verifyToken = function(req, res, next) {
	var token = req.params.token;
    verifyUser(token, function(err) {
        if (err) return res.status(400).send('Token not valid');
        res.status(200).send('User is verified');
    });
};


