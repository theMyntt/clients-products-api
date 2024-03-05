const {
  ClientCollection,
  logCollection,
} = require("../model/model");

async function setClients(postData) {
  try {
    const check = await ClientCollection.findOne({ email: postData.email });

    if (check) {
      return res.status(400).json({
        message: "Email já cadastrado",
      });
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

      return res.status(200).json({
        message: "Cliente cadastrado com sucesso",
      });
    } catch {
      return res.status(500).json("Erro ao inserir no banco de dados");
    }
  } catch {
    return res.status(500).json("Erro Interno");
  }
}

export default setClients;