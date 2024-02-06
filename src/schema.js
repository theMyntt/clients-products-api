const mongoose = require("mongoose");
const mongo_url = "mongodb+srv://gabrielaraujo:cmqgww723@database.dllhpou.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Mongo connected on " + mongo_url);
  })
  .catch((error) => {
    console.error("Failed to connect: " + error);
  });

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

const ClientCollection = mongoose.model('Client', clientSchema);
const ReqProducts = mongoose.model('ReqProducts', requestProductsSchema);

module.exports = ClientCollection;