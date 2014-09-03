'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var noteSchema = new Schema({
  title: String,
  description: String,
  type: String,
  content: String
});

module.exports = mongoose.model('Note', noteSchema);
