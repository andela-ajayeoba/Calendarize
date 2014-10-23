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

mongoose.model('Calendarize', CalendarizeSchema);