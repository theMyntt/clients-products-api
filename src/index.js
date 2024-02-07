const { ClientCollection, ReqProducts } = require("./schema");

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.post("/clients/create/", async (req, res) => {
  
  try {
    const postData = {
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      cellphone: req.body.cellphone,
      birthday: req.body.birthday,
      address: req.body.address,
      addressComplement: req.body.addressComplement,
      city: req.body.city,
      cep: req.body.cep,
      createdAt: req.body.createdAt,
    };

    const check = await ClientCollection.findOne({email: postData.email});
    
    if (check) {
      res.status(400).json({
        message: "Email já cadastrado",
      });
    } else {
      await ClientCollection.insertMany([postData]);
      res.status(200).json({
        message: "Cliente cadastrado com sucesso",
      });
    }
  } catch (error) {
    res.status(500).json("Error interno: " + error);
  }
});

app.get("/clients/", async (req, res) => {
  
  try {
    const getData = {
      email: req.query.email.toLowerCase(),
    };

    const check = await ClientCollection.findOne({ email: getData.email });
    if (check) {
      res.status(200).send(check);
    } else {
      res.status(404).json({
        message: "Cliente não encontrado",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.put("/pedidos/put", async (req, res) => {
  // inserir pedidos 

  try {
    const putData = {
      pedidoId: req.body.pedidoId,
      createdAt: req.body.createdAt,
      resumo: req.body.resumo,
    }

    await ReqProducts.insertMany([putData]);
    res.status(200).json(JSON.stringify(putData + "Inserido."));
  } catch (err) {
    res.status(500).json("Erro interno: " + err);
  }
});

app.listen(3000, () => {
  console.log("listening on port " + port);
});
