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

			var res = Projects({ 	            
		            _id: '525a8422f6d0f87f0e407a33',
					name: 'Person Name',
					email: 'person@email.com',
					user: user		           
        		});

			return Person.find({user: res.user}).distinct(function(err){
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
