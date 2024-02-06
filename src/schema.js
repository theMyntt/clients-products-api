const mongoose = require("mongoose");
const mongo_uri = "mongodb+srv://gabrielaraujo:cmqgww723@database.dllhpou.mongodb.net/";

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Mongo connected on " + MONGO_URI);
  })
  .catch((error) => {
    console.error("Failed to connect: " + error);
  });

const clientSchema = new mongoose.Schema({
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
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  addressComplement: {
    type: String,
    required: true,
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
    type: Date,
    default: Date.now,
  },
});

const requestProductsSchema = new mongoose.Schema({
  pedidoId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resumo: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model('Client', clientSchema);
const ReqProducts = mongoose.model('ReqProducts', requestProductsSchema);

module.exports =  {
    Client,
    ReqProducts
}