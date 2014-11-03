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

<<<<<<< HEAD
mongoose.model('Calendarize', CalendarizeSchema);

/**
 * Workers Schema
 */
var WorkerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Project title',
=======
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
>>>>>>> 8c4af578c2db411f40de779d49813792ea8042ac
		trim: true
	},
	email: {
		type: String,
<<<<<<< HEAD
		trim: true,
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	group: {
		type: String,
		default: '',
		trim: true
	},
	inactive: {
		type: Boolean,
		default: false
	},
	project: [CalendarizeSchema]
});

mongoose.model('Workers', WorkerSchema);
=======
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
	}
 });


mongoose.model('Assignment', AssignmentSchema);
mongoose.model('Workers', WorkersSchema);
mongoose.model('Calendarize', CalendarizeSchema);
mongoose.model('Project', ProjectSchema);
>>>>>>> 8c4af578c2db411f40de779d49813792ea8042ac
