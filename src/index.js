const { ClientCollection, ReqProducts, logCollection } = require("./model/model");
const dateOrdenate = require("./utils/dateOrdenate")
const express = require("express");
// import expresss from "express";
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
      createdAt: new Date(),
    };

    const check = await ClientCollection.findOne({email: postData.email});
    
    if (check) {
      res.status(400).json({
        message: "Email já cadastrado",
      });
    } else {
      const logData = {
        id: Math.floor(Math.random() * 100000000000000000),
        itsFor: "client",
        name: postData.name,
        createdAt: new Date(),
      }

      await ClientCollection.insertMany([postData]);
    
      await logCollection.insertMany([logData]);

      res.status(200).json({
        message: "Cliente cadastrado com sucesso",
      });
    }
  } catch (error) {
    res.status(500).json("Error interno: " + error);
  }
});

app.get("/clients/", async (req, res) => {
  const ordenate = (req.query.ordenate === "true"); 
  console.log( req.query.ordenate, ordenate)
  try {
    // const getData = {
    //   email: req.query.email.toLowerCase(),
    // };

    const check = await ClientCollection.find();
    if (check) {
      if(ordenate) {
        dateOrdenate(check)
      }
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

app.put("/products/put", async (req, res) => {
  try {
    const putData = {
      pedidoId: Math.floor(Math.random() * 100000000000000000),
      createdAt: new Date(),
      resumo: req.body.resumo,
    }

    const logData = {
      id: Math.floor(Math.random() * 100000000000000000),
      itsFor: "products",
      userId: req.body.userId,
      name: putData.resumo,
      createdAt: new Date(),
    }

    await ReqProducts.insertMany([putData]);
    await logCollection.insertMany([logData]);

    res.status(200).json(putData);
  } catch (err) {
    res.status(500).json("Erro interno: " + err);
  }
});

app.get("/products/get", async (req, res) => {
  try {
    // const getData = {
    //   pedidoId: req.query.pedidoId,
    //   createdAt: req.query.createdAt,
    //   resumo: req.query.resumo,
    // };
    
    const check = await ReqProducts.find();
    res.status(200).json(check);
  } catch (err) {
    res.status(500).json("Erro interno: " + err);
  }
});

app.get("/log/get", async (req, res) => {
  try {
    res.status(200).json(await logCollection.find());
  } catch (err) {
    res.status(500).json("Erro interno: " + err);
  }
});

app.listen(3000, () => {
  console.log("listening on port " + port);
});
