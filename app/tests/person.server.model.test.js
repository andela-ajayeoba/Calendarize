'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Task = mongoose.model('Task'),
	Person = mongoose.model('Person');

/**
 * Globals
 */
var user, person;

/**
 * Unit tests
 */
describe('Person Model Unit Tests:', function() {
	beforeEach(function(done) {
		// user = new User({
		// 	name: 'Account Name'
		// 	// displayName: 'Account Name',
		// 	email: 'test@test.com',
		// 	username: 'username',
		// 	password: 'password'
		// });

		// user.save(function() { 
		// 	person = new Person({
		// 		name: 'Person Name',
		// 		email: 'person@email.com',
		// 		group: '',
		// 		user: user
		// 	});

		// 	done();
		// });

		user = new User({
			name: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		this.anotherUser = new User({
			name: 'Another Joe',
			displayName: 'Another',
			email: 'joe@another.com',
			username: 'anotherjoe',
			password: 'password'
		});
		this.anotherUser.save(function(){});

		user.save(function() {
			done();
		});
	});

	describe('Method to save a Person', function() {
		beforeEach(function(done) {
			person = new Person({
				name: 'Person Name',
				email: 'person@email.com',
				user: user
			});
			done();
		});
		it('should be able to save without problems', function(done) {
			return person.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			person.name = '';

			return person.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should list all the Persons', function(done){
			return Person.find(function(err){
				should.not.exist(err);
				done();
			});
		});

		it('should list a Person', function(done){
			return Person.find(function(err){
				should.not.exist(err);
				done();
			});
		});

		it('should update a person without any problem', function(done) {
			person.name = 'Person';
			return person.save(function(err) {

				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when trying to save without a person email', function(done) {
			person.email = '';

			return person.save(function(err){
				should.exist(err);
				done();
			});
		});

		it('should delete a person without any problem', function(done) {
			return person.remove(function(err) {
				should.not.exist(err);
				done();
			});
		});



	});

	afterEach(function(done) { 
		Person.remove().exec();
		User.remove().exec();

		done();
	});
});
