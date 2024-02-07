const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cellphone: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  addressComplement: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = clientSchema;