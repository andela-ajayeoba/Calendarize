'use strict';

/**
 *	Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Project Schema
 */

var ProjectSchema = new Schema({
	name: {
		type: String,
		required: 'Please fill in a Project Name',
		trim: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	tasks : [{
		type: Schema.ObjectId,
		ref: 'Task'
	}]
});


/**
 *	Person Schema
 */

var PersonSchema = new Schema({
	name: {
		type: String,
		required: 'Please fill in a Workers Name',
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		required: 'Please fill a valid email address',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	group: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	isActive: {
		type: Boolean,
		default: true
	},
	tasks : [{
		type: Schema.ObjectId,
		ref: 'Task'
	}]
});


/**
 *	Task Schema
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


mongoose.model('Task', TaskSchema);
mongoose.model('Person', PersonSchema);
mongoose.model('Project', ProjectSchema);

