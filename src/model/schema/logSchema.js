const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  itsFor: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = logSchema;