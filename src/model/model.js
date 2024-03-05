const clientSchema = require("./schema/clientSchema");
const requestProductsSchema = require("./schema/requestProductsSchema");
const logSchema = require("./schema/logSchema");

require("dotenv").config();

const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URI;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Mongo connected on " + mongo_url);
  })
  .catch((error) => {
    console.error("Failed to connect: " + error);
  });

const ClientCollection = mongoose.model("Client", clientSchema);
const ReqProducts = mongoose.model("ReqProducts", requestProductsSchema);
const logCollection = mongoose.model("log", logSchema);

module.exports = { ClientCollection, ReqProducts, logCollection };  
