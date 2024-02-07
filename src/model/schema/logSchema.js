const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  itsFor: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = logSchema;