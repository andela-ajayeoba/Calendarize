'use strict';

/**
 *	Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;




/**
<<<<<<< HEAD
 * Calendarize Schema
 */
var CalendarizeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Project name',
		trim: true
	},
	start: {
		type: Date,
		default: Date.now
	},
	worker: {
		type: Schema.ObjectId,
		ref: 'Worker'
	},
	stop: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});




/**
 * Project Schema
=======
 *	Project Schema
>>>>>>> 2de985ba2a1341ae48aee1f31e590ac57190e3ea
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
		trim: true,
		default: '',
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
	tasks: [{
		type: Schema.ObjectId,
		ref: 'Assignment'
	}]
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

