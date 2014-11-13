'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project'),
	Person = mongoose.model('Person'),
	Task = mongoose.model('Task');

/**
 * Globals
 */
var user, project, person, task;

/**
 * Unit tests
 */
describe('Calendarize Model Unit Tests:', function() {
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

	describe('Projects Tests', function() {
		beforeEach(function(done) {
			project = new Project({
				name: 'Project Name',
				user: user
			});
			done();
		});

		it('should be able to save without problems', function(done) {
			return project.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to update without problems', function(done) {
			project.name = 'New name';
			//project = _.extend(project , project.name);
			return project.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to delete', function(done) {
			return project.remove(function(err){
				should.not.exist(err);
				done();
			});
		});

		it('should be able to find all projects', function(done){
			return Project.find(function(err){
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when trying to save without a projectname', function(done) { 
			project.name = '';

			return project.save(function(err) {
				should.exist(err);
				done();
			});
		});


		afterEach(function(done) { 
			Project.remove().exec();
			User.remove().exec();
			done();
		});
	});

	describe('Persons Tests', function() {
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

		it('should list all the Persons', function(done){
			return Person.find(function(err){
				should.not.exist(err);
				done();
			})
		});

		it('should update a person without any problem', function(done) {
			person.name = 'deji';
			return person.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should delete a person without any problem', function(done) {
			return person.remove(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when trying to save without a person name', function(done) {
			person.name = '';

			return person.save(function(err){
				should.exist(err);
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

		afterEach(function(done) { 
			Project.remove().exec();
			User.remove().exec();
			done();
		});
	});

	describe('Tasks Tests', function(done) {
		beforeEach(function(done) {
			project = new Project({
				name: 'Design'
			});
			person = new Person({
				name: 'Person name',
				email: 'person@email.com'
			});
			task = new Task({
				projectId: project._id,
				personId: person._id,
				startDate: '2001-06-12T02:14:02.553Z',
				endDate: '2001-06-19T02:14:02.553Z'
			});
			done();
		});

		it('should be able to save without problems', function(done) {
			return task.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should update task', function(done){
			return task.update(function(err){
				should.not.exist(err);
				done();
			});
		});

		it('should delete task', function(done){
			return task.remove(function(err){
				should.not.exist(err);
				done();
			});
		});

		afterEach(function(done) {
			Task.remove().exec();
			User.remove().exec();
			done();
		});
	});

});
