'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;




/**
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
 */

var ProjectSchema = new Schema({
	projectname: {
		type: String,
		required: 'Please fill in a Project Name',
		trim: true
	},

	isactive: {
		type: Boolean,
		default: true
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	people: [{
		type: Schema.ObjectId,
		ref: 'Workers'
	}]
});


/**
 * Worker Schema
 */

var WorkersSchema = new Schema({
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

	isactive: {
		type: Boolean,
		default: true
	}
});


/**
 * Timeline Schema
 */

 var AssignmentSchema = new Schema ({
 	
 	worker: {
 		type: Schema.ObjectId,
 		ref: 'Workers'
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
	}
 });


mongoose.model('Assignment', AssignmentSchema);
mongoose.model('Workers', WorkersSchema);
mongoose.model('Calendarize', CalendarizeSchema);
mongoose.model('Project', ProjectSchema);

