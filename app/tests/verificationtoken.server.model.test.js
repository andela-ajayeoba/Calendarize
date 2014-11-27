'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Verificationtoken = mongoose.model('Verificationtoken');

/**
 * Globals
 */
var user, verificationtoken;

/**
 * Unit tests
 */
describe('Verificationtoken Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			name: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			verificationtoken = new Verificationtoken({
				_userId: user,
				token: 'ghjvsjh7887ds76dhvsvddsdubh73b8bns'
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return verificationtoken.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without token', function(done) { 
			verificationtoken.token = '';

			return verificationtoken.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Verificationtoken.remove().exec();
		User.remove().exec();

		done();
	});
});
