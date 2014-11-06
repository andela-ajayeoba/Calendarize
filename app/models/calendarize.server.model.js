'use strict';

/**
 *	Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 *	Project Schema
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
	}
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
		required: 'Please fill in an E-mail',
		trim: true
	},
	group: {
		type: String,
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	isActive: {
		type: Boolean,
		default: true
	}
});

/**
 *	Task Schema
 */

 var TaskSchema = new Schema ({
 	person:{
 		type: Schema.ObjectId,
 		ref: 'Person'
 	},
 	project:{
 		type: Schema.ObjectId,
 		ref: 'Project'
 	},
	startDate:{
		type: Date
	},
	endDate:{
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
