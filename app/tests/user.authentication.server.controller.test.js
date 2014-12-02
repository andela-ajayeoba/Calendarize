'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	request = require('supertest'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user1, user2;

var agent = request.agent('http://localhost:3001');

describe('User authentication server controller unit test', function() {
	it('Create Users', function(done) {
    	user1 = new User({
			name: 'Fullest',
			displayName: 'Fuller Name',
			email: 'tester@tester.com',
			username: 'username',
			password: 'password',
			verified: true,
			provider: 'local'
		});
		user2 = new User({
			name: 'Another Joe',
			displayName: 'Another',
			email: 'joe@another.com',
			username: 'anotherjoe',
			password: 'password',
			verified: false,
			provider: 'local'
		});
		user1.save(function() {
		});
		user2.save(function() {
			done();
		});
	});

	it ('should Signin verified users', function(done) {
		agent.post('/auth/signin')
		.send({email: 'tester@tester.com', password: 'password'})
		.expect(200)
		.end(function(err, res) {
          	if (err) {
            	throw err;
          	}
          	return done();
        });
	});
	it ('should not Signin unverified users', function(done) {
		agent.post('/auth/signin')
		.send({email: 'joe@another.com', password: 'password'})
		.expect(400)
		.end(function(err, res) {
          	if (err) {
            	throw err;
          	}
          	return done();
        });
	});

	after(function(done) { 
		User.remove().exec();

		done();
	});
});
