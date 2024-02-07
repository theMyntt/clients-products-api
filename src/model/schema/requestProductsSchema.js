const mongoose = require("mongoose");

const requestProductsSchema = mongoose.Schema({
  pedidoId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  resumo: {
    type: String,
    required: true,
  },
});

module.exports = requestProductsSchema;