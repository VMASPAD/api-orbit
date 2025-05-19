const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  apis: [
    {
      name: String,
      content: [mongoose.Schema.Types.Mixed]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('User', userSchema);