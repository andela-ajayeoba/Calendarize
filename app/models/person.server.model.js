'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Person Schema
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
    tasks: [{
        type: Schema.ObjectId,
        ref: 'Task'
    }]
});

mongoose.model('Person', PersonSchema);
