'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Person = mongoose.model('Person'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, person;

/**
 * Person routes tests
 */
describe('Person CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Person
		user.save(function() {
			person = {
				name: 'Person Name'
			};

			done();
		});
	});

	it('should be able to save Person instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Person
				agent.post('/persons')
					.send(person)
					.expect(200)
					.end(function(personSaveErr, personSaveRes) {
						// Handle Person save error
						if (personSaveErr) done(personSaveErr);

						// Get a list of Persons
						agent.get('/persons')
							.end(function(personsGetErr, personsGetRes) {
								// Handle Person save error
								if (personsGetErr) done(personsGetErr);

								// Get Persons list
								var persons = personsGetRes.body;

								// Set assertions
								(persons[0].user._id).should.equal(userId);
								(persons[0].name).should.match('Person Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Person instance if not logged in', function(done) {
		agent.post('/persons')
			.send(person)
			.expect(401)
			.end(function(personSaveErr, personSaveRes) {
				// Call the assertion callback
				done(personSaveErr);
			});
	});

	it('should not be able to save Person instance if no name is provided', function(done) {
		// Invalidate name field
		person.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Person
				agent.post('/persons')
					.send(person)
					.expect(400)
					.end(function(personSaveErr, personSaveRes) {
						// Set message assertion
						(personSaveRes.body.message).should.match('Please fill Person name');
						
						// Handle Person save error
						done(personSaveErr);
					});
			});
	});

	it('should be able to update Person instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Person
				agent.post('/persons')
					.send(person)
					.expect(200)
					.end(function(personSaveErr, personSaveRes) {
						// Handle Person save error
						if (personSaveErr) done(personSaveErr);

						// Update Person name
						person.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Person
						agent.put('/persons/' + personSaveRes.body._id)
							.send(person)
							.expect(200)
							.end(function(personUpdateErr, personUpdateRes) {
								// Handle Person update error
								if (personUpdateErr) done(personUpdateErr);

								// Set assertions
								(personUpdateRes.body._id).should.equal(personSaveRes.body._id);
								(personUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Persons if not signed in', function(done) {
		// Create new Person model instance
		var personObj = new Person(person);

		// Save the Person
		personObj.save(function() {
			// Request Persons
			request(app).get('/persons')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Person if not signed in', function(done) {
		// Create new Person model instance
		var personObj = new Person(person);

		// Save the Person
		personObj.save(function() {
			request(app).get('/persons/' + personObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', person.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Person instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Person
				agent.post('/persons')
					.send(person)
					.expect(200)
					.end(function(personSaveErr, personSaveRes) {
						// Handle Person save error
						if (personSaveErr) done(personSaveErr);

						// Delete existing Person
						agent.delete('/persons/' + personSaveRes.body._id)
							.send(person)
							.expect(200)
							.end(function(personDeleteErr, personDeleteRes) {
								// Handle Person error error
								if (personDeleteErr) done(personDeleteErr);

								// Set assertions
								(personDeleteRes.body._id).should.equal(personSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Person instance if not signed in', function(done) {
		// Set Person user 
		person.user = user;

		// Create new Person model instance
		var personObj = new Person(person);

		// Save the Person
		personObj.save(function() {
			// Try deleting Person
			request(app).delete('/persons/' + personObj._id)
			.expect(401)
			.end(function(personDeleteErr, personDeleteRes) {
				// Set message assertion
				(personDeleteRes.body.message).should.match('User is not logged in');

				// Handle Person error error
				done(personDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Person.remove().exec();
		done();
	});
});