'use strict';

/**
 * Module dependencies.
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
    tasks: [{
        type: Schema.ObjectId,
        ref: 'Task'
    }]
});

mongoose.model('Project', ProjectSchema);
