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
		required: 'Please fill Calendarize name',
		trim: true
	},
	created: {
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

	isactive: {
		type: Boolean,
		default: true
	}
});

/**
 * Timeline Schema
 */

 var AssignmentSchema = new Schema ({
 	
 	workers : {
 		type: Schema.ObjectId,
 		ref: 'Workers'
 	},

 	projects:{
 		type: Schema.ObjectId,
 		ref: 'Project'
 	},

	startDate:{
		type: Date
	},

	endDate:{
		type: Date
	}
 });


// mongoose.model('Assignment', AssignmentSchema);
mongoose.model('Workers', WorkersSchema);
mongoose.model('Calendarize', CalendarizeSchema);
mongoose.model('Project', ProjectSchema);
