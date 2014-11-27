'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Verificationtoken = mongoose.model('Verificationtoken'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, verificationtoken;

/**
 * Verificationtoken routes tests
 */
describe('Verificationtoken CRUD tests', function() {
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

		// Save a user to the test db and create new Verificationtoken
		user.save(function() {
			verificationtoken = {
				name: 'Verificationtoken Name'
			};

			done();
		});
	});

	it('should be able to save Verificationtoken instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verificationtoken
				agent.post('/verificationtokens')
					.send(verificationtoken)
					.expect(200)
					.end(function(verificationtokenSaveErr, verificationtokenSaveRes) {
						// Handle Verificationtoken save error
						if (verificationtokenSaveErr) done(verificationtokenSaveErr);

						// Get a list of Verificationtokens
						agent.get('/verificationtokens')
							.end(function(verificationtokensGetErr, verificationtokensGetRes) {
								// Handle Verificationtoken save error
								if (verificationtokensGetErr) done(verificationtokensGetErr);

								// Get Verificationtokens list
								var verificationtokens = verificationtokensGetRes.body;

								// Set assertions
								(verificationtokens[0].user._id).should.equal(userId);
								(verificationtokens[0].name).should.match('Verificationtoken Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Verificationtoken instance if not logged in', function(done) {
		agent.post('/verificationtokens')
			.send(verificationtoken)
			.expect(401)
			.end(function(verificationtokenSaveErr, verificationtokenSaveRes) {
				// Call the assertion callback
				done(verificationtokenSaveErr);
			});
	});

	it('should not be able to save Verificationtoken instance if no name is provided', function(done) {
		// Invalidate name field
		verificationtoken.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verificationtoken
				agent.post('/verificationtokens')
					.send(verificationtoken)
					.expect(400)
					.end(function(verificationtokenSaveErr, verificationtokenSaveRes) {
						// Set message assertion
						(verificationtokenSaveRes.body.message).should.match('Please fill Verificationtoken name');
						
						// Handle Verificationtoken save error
						done(verificationtokenSaveErr);
					});
			});
	});

	it('should be able to update Verificationtoken instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verificationtoken
				agent.post('/verificationtokens')
					.send(verificationtoken)
					.expect(200)
					.end(function(verificationtokenSaveErr, verificationtokenSaveRes) {
						// Handle Verificationtoken save error
						if (verificationtokenSaveErr) done(verificationtokenSaveErr);

						// Update Verificationtoken name
						verificationtoken.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Verificationtoken
						agent.put('/verificationtokens/' + verificationtokenSaveRes.body._id)
							.send(verificationtoken)
							.expect(200)
							.end(function(verificationtokenUpdateErr, verificationtokenUpdateRes) {
								// Handle Verificationtoken update error
								if (verificationtokenUpdateErr) done(verificationtokenUpdateErr);

								// Set assertions
								(verificationtokenUpdateRes.body._id).should.equal(verificationtokenSaveRes.body._id);
								(verificationtokenUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Verificationtokens if not signed in', function(done) {
		// Create new Verificationtoken model instance
		var verificationtokenObj = new Verificationtoken(verificationtoken);

		// Save the Verificationtoken
		verificationtokenObj.save(function() {
			// Request Verificationtokens
			request(app).get('/verificationtokens')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Verificationtoken if not signed in', function(done) {
		// Create new Verificationtoken model instance
		var verificationtokenObj = new Verificationtoken(verificationtoken);

		// Save the Verificationtoken
		verificationtokenObj.save(function() {
			request(app).get('/verificationtokens/' + verificationtokenObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', verificationtoken.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Verificationtoken instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verificationtoken
				agent.post('/verificationtokens')
					.send(verificationtoken)
					.expect(200)
					.end(function(verificationtokenSaveErr, verificationtokenSaveRes) {
						// Handle Verificationtoken save error
						if (verificationtokenSaveErr) done(verificationtokenSaveErr);

						// Delete existing Verificationtoken
						agent.delete('/verificationtokens/' + verificationtokenSaveRes.body._id)
							.send(verificationtoken)
							.expect(200)
							.end(function(verificationtokenDeleteErr, verificationtokenDeleteRes) {
								// Handle Verificationtoken error error
								if (verificationtokenDeleteErr) done(verificationtokenDeleteErr);

								// Set assertions
								(verificationtokenDeleteRes.body._id).should.equal(verificationtokenSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Verificationtoken instance if not signed in', function(done) {
		// Set Verificationtoken user 
		verificationtoken.user = user;

		// Create new Verificationtoken model instance
		var verificationtokenObj = new Verificationtoken(verificationtoken);

		// Save the Verificationtoken
		verificationtokenObj.save(function() {
			// Try deleting Verificationtoken
			request(app).delete('/verificationtokens/' + verificationtokenObj._id)
			.expect(401)
			.end(function(verificationtokenDeleteErr, verificationtokenDeleteRes) {
				// Set message assertion
				(verificationtokenDeleteRes.body.message).should.match('User is not logged in');

				// Handle Verificationtoken error error
				done(verificationtokenDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Verificationtoken.remove().exec();
		done();
	});
});