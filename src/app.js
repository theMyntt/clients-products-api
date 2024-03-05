const {
  ClientCollection,
  ReqProducts,
  logCollection,
} = require("./model/model");
const dateOrdenate = require("./utils/dateOrdenate");
const setClients = require("./utils/setClients");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/clients/setclients/", async (req, res) => {
  try {
    const {name, email, cellphone, birthday, address, addressComplement, city, cep} = req.body;

    const postData = {
      name: name,
      userId: Math.floor(Math.random() * 100000000000000000),
      email: email.toLowerCase(),
      cellphone: cellphone,
      birthday: birthday,
      address: address,
      addressComplement: addressComplement,
      city: city,
      cep: cep,
      createdAt: new Date(),
    };

    return res.status(200).json(setClients(postData));
  } catch {
    return res.status(500).json("Erro interno");
  }
});

app.get("/clients/getclients", async (req, res) => {
  const ordenate = req.query.ordenate === "true";
  console.log(req.query.ordenate, ordenate);
  try {
    // const getData = {
    //   email: req.query.email.toLowerCase(),
    // };

    const check = await ClientCollection.find();
    let arr;
    if (check) {
      if (ordenate) {
        arr = dateOrdenate(check);

        res.status(200).send(arr);
      } else {
        res.status(200).send(check);
      }
    } else {
      res.status(404).json({
        message: "Clientes não encontrados",
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
    };

    const logData = {
      id: Math.floor(Math.random() * 100000000000000000),
      itsFor: "products",
      userId: req.body.userId,
      name: putData.resumo,
      createdAt: new Date(),
    };

    await ReqProducts.insertMany([putData]);
    await logCollection.insertMany([logData]);

    res.status(200).json(putData);
  } catch (err) {
    res.status(500).json("Erro interno: " + err);
  }
});

app.get("/products/get", async (req, res) => {
  try {
    const check = await ReqProducts.find();
    return res.status(200).json(check);
  } catch (err) {
    return res.status(500).json("Erro interno: " + err);
  }
});

app.get("/log/get", async (req, res) => {
  try {
    return res.status(200).json(await logCollection.find());
  } catch (err) {
    return res.status(500).json("Erro interno: " + err);
  }
});

app.listen(3000, () => {
  console.log("listening on port " + port);
});
