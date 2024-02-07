const clientSchema = require("./schema/clientSchema");
const requestProductsSchema = require("./schema/requestProductsSchema");

const mongoose = require("mongoose");
const mongo_url =
  "mongodb+srv://gabrielaraujo:cmqgww723@database.dllhpou.mongodb.net/?retryWrites=true&w=majority";

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

module.exports = { ClientCollection, ReqProducts };
