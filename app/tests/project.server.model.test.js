'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project');

/**
 * Globals
 */
var user, project;

/**
 * Unit tests
 */
 
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
 
describe('Project Model Unit Tests:', function() {
	beforeEach(function(done) {
		project = new Project({
				name: 'Project Name',
				user: user
			});
			done();
		});

	describe('Method Save', function() {
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

		it('should be able to delete project', function(done) {
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

		it('should be able to show an error when try to save without name', function(done) { 
			project.name = '';

			return project.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Project.remove().exec();
		User.remove().exec();

		done();
	});
});
