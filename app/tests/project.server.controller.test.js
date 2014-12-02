'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	request = require('supertest'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project');

/**
 * Globals
 */
var project1, project2, user1, user2;
var agent = request.agent('http://localhost:3001');

describe('Project Endpoint Tests', function() {
    
    it('Create Users', function(done) {
    	user1 = new User({
			name: 'Full',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		user2 = new User({
			name: 'Another Joe',
			displayName: 'Another',
			email: 'joe@another.com',
			username: 'anotherjoe',
			password: 'password',
			provider: 'local'
		});
		
		user1.save(function(){});

		user2.save(function() {
			done();
		});
    });

    it('Create projects', function(done) {
    	project1 = new Project({
			name: 'Project1',
			user: user1
		});

		project2 = new Project({
			name: 'Project2',
			user: user2
		});

		project1.save(function(){});

		project2.save(function() {
			done();
		});
    });
    it('should not create project if user is not logged in', function(done) {
    	agent.post('/projects')
    	.send({name: 'matsi'})
    	.expect(401)
    	.end(onResponse);

    	function onResponse(err, res) {
    		if(err) return done(err);
    		return done();
    	}
    });

    it('should login User', function(done) {
        agent.post('/auth/signin')
            .send({ email: 'test@test.com', password: 'password' })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
           	if (err) return done(err);
           	return done();
        }
    });

    it('Should be able to update a project', function(done){
      agent.put('/projects/'+ project1._id)
      .send({name: 'Another Name'})
      .expect(200)

      .end(function(err, res){
        if(err){
          throw err;
        }
        Project.findOne({name: 'Another Name'}, function(err, per){
          should.exist(per);
        });
        return done();
      });
    });

    it('should list Projects', function(done){
      agent.get('/projects')
      .expect(200)

      .end(function(err, res){
        if(err){
          throw err;
        }
        Project.find({}, function(err, pro){
          should.exist(pro);
        });
        return done(); 
      });
    });

    it('should not delete a project that does not belong to him', function(done) {
    	agent.delete('/projects/' + project2._id)
		.expect(403)
   		// end handles the response
		.end(function(err, res) {
          	if (err) {
            	throw err;
          	}
          	return done();
        });
    });
    it('should not create a project that already exists', function(done) {
    	agent.post('/projects')
    	.send(project1)
		.expect(400)

   		// end handles the response
		.end(function(err, res) {
          	if (err) {
            	throw err;
          	}
          	return done();
        });
    });

	after(function(done) {
		Project.remove().exec();
		User.remove().exec();
		done();
	});
});
