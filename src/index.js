const { ClientCollection, ReqProducts } = require("./schema");

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.post("/clients/create/", async (req, res) => {
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
});

app.get("/clients/", async (req, res) => {
  const getData = {
    email: req.query.email.toLowerCase(),
  };

  //   if ()
  const check = await ClientCollection.findOne({ email: getData.email });
  if (check) {
    res.status(200).send(check);
  } else {
    res.status(404).json({
      message: "Cliente não encontrado",
    });
  }
});


app.listen(3000, () => {
  console.log("listening on port " + port);
});
