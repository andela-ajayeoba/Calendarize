'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var	Project  = require('mongoose').model('Project');
var Person = require('mongoose').model('Person');
/**
 * Task Schema
 */
var TaskSchema = new Schema ({
 	personId: {
 		type: Schema.ObjectId,
 		ref: 'Person'
 	},
 	personName: {
 		type: String
 	},
 	projectId: {
 		type: Schema.ObjectId,
 		ref: 'Project'
 	},
 	projectName: {
 		type: String
 	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date
	}
 });

// TaskSchema.post('save', function (task) {

// 	var person, project;
// 	var newTask = {};

//   Person.findById(task.personId).exec(function(err, person_object) {
//     person = person_object;
//     newTask.personName = person_object.name;

//     Project.findById(task.projectId).exec(function(err, project_object) {

//       project = project_object;
//     	newTask.projectName = project_object.name;

//     newTask = {
//     	_id : task._id,
//       startDate : task.startDate,
//       endDate : task.endDate
//     }
//     console.log(newTask);
//       person.tasks.push(newTask);
//       person.save();
//       project.tasks.push(newTask);
//       project.save();          
//     });
//   });

// });

mongoose.model('Task', TaskSchema);
