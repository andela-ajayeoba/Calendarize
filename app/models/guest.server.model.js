'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  uuid = require('node-uuid'),
  Schema = mongoose.Schema;

/**
 * Person Schema
 */
var GuestSchema = new Schema({
  name : {
    type : String,
    trim : true,
    default : ''
  },
  email: {
    type: String,
    trim: true,
    default: '',
    required: 'Please fill a valid email address',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  isPending: {
    type: Boolean,
    default: true
  },
  token: {
    type: String,
    required: true
  },
  timeline: {
    type: Schema.ObjectId,
    ref: 'Timeline'
  }
});

/**
 * Guest Schema method
 */
GuestSchema.methods.createGuestToken = function (done) {
  var verifyGuestToken = this;
  var token = uuid.v4();
  verifyGuestToken.set('token', token);
  verifyGuestToken.save( function (err) {
    if (err) {
      return done(err);
    }
    return done(null, token);
  });
};

/**
 * Register Guest as a User
 */
 // GuestSchema.post('save' , function(guest){
 //  var regGuest = {
 //    name : guest.name,
 //    email : guest.email,
 //    username : guest.name,
 //    password : '1234567890abcd',
 //    provider : 'local',
 //    verified : true
 //  };
 //  var user = new User(regGuest);
 //  user.save();
 // });

module.exports = mongoose.model('Guest', GuestSchema);
