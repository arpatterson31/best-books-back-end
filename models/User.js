'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String}
});

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  books: [bookSchema]
});

const User = mongoose.model('Book Lovah', userSchema);

module.exports = User;
