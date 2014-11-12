'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Calendarize = mongoose.model('Calendarize'),
	Project = mongoose.model('Project'),
	Person = mongoose.model('Person'),
	Task = mongoose.model('Task');


/**
 * Globals
 */
var user, calendarize;

/**
 * Unit tests
 */
describe('Calendarize Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			calendarize = new Calendarize({
				name: 'Calendarize Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return calendarize.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			calendarize.name = '';

			return calendarize.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Calendarize.remove().exec();
		User.remove().exec();

		done();
	});
});