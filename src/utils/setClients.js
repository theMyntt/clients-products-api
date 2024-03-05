const {
  ClientCollection,
  logCollection,
} = require("../model/model");

async function setClients(postData) {
  try {
    const check = await ClientCollection.findOne({ email: postData.email });

    if (check) {
      return "Email já cadastrado";
    }

    const logData = {
      id: Math.floor(Math.random() * 100000000000000000),
      userId: postData.userId,
      itsFor: "client",
      name: postData.name,
      createdAt: new Date(),
    };

    try {
      await ClientCollection.insertMany([postData]);
      await logCollection.insertMany([logData]);

      return "Cliente cadastrado com sucesso";
    } catch (error) {
      return error
    }
  } catch (error) {
    return error
  }
}

module.exports = setClients