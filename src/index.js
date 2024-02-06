const { ClientCollection, ReqProducts } = require("./schema");

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/clients", async (req, res) => {
  const getData = {
    email: req.query.email.toLowerCase(),
  };

//   if ()
  const check = await ClientCollection.findOne({email: getData.email});
  if (check) {
    res.status(200).json(JSON.stringify(check));
  }else {
    res.status(404).json({
      message: "Cliente não encontrado",
    });
  }
});

app.listen(3000, () => {
  console.log("listening on port " + port);
});
