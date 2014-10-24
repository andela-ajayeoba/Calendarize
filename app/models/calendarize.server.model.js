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

mongoose.model('Calendarize', CalendarizeSchema);

/**
 * Workers Schema
 */
var WorkerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Project title',
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
	inactive: {
		type: Boolean,
		default: false
	},
	project: [CalendarizeSchema]
});

mongoose.model('Workers', WorkerSchema);