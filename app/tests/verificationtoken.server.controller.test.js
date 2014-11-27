'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	request = require('supertest'),
	User = mongoose.model('User'),
	Verificationtoken = mongoose.model('Verificationtoken');

/**
 * Globals
 */
var user1, verificationtoken;

var agent = request.agent('http://localhost:3001');

describe('Verificationtoken Controller Unit Tests:', function() {
	beforeEach(function(done) {
		user1 = new User({
			name: 'Full Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user1.save(function() { 
			verificationtoken = new Verificationtoken({
				_userId: 'user1',
				token: 'hhbsru8798uuiji898iuyg7ybvhg788i',
				createdAt: Date.now()
			});
			done();
		});
	});

	describe('Method Verify', function() {
		it('should be able to verify users with a valid token', function(done) {
			agent.post('/verify')
			.send(verificationtoken)
			.expect(200)

			.end(onResponse);

	    	function onResponse(err, res) {
	    		if(err) return done(err);
	    		return done();
	    	}
		})
	})

	afterEach(function(done) { 
		Verificationtoken.remove().exec();
		User.remove().exec();

		done();
	});
})