'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	request = require('supertest'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Verificationtoken = mongoose.model('Verificationtoken');

/**
 * Globals
 */
var user, verificationtoken
var agent = request.agent('http://localhost:3001');

describe('Verification Controller Endpoint Tests', function() {
    
    it('Create Users', function(done) {
    	user = new User({
			name: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user.save(function(){
			verificationtoken = new Verificationtoken({
				_userId: user,
				token:
			})
		});
		});
    });
