// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
  type: Number,
  required: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  chitId: {
    type: Number,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;