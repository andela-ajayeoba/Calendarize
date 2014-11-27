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
var user1, verificationtoken;

/**
 * Unit tests
 */
describe('Verificationtoken Model Unit Tests:', function() {
	beforeEach(function(done) {
		user1 = new User({
			name: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user1.save(function() { 
			verificationtoken = new Verificationtoken({
				token: 'hhbsru8798uuiji898iuyg7ybvhg788i'
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

	describe('Method Verify', function() {
		it('should be able to verify users with a valid token', function(done) {
			return verificationtoken.verifyUser('hhbsru8798uuiji898iuyg7ybvhg788i', function(err) {
				should.not.exist(err);
				expect(user['verify']).to.equal(true);
			});

		})
	})

	afterEach(function(done) { 
		Verificationtoken.remove().exec();
		User.remove().exec();

		done();
	});
});
