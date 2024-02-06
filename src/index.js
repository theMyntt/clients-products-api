const express = require("express");

const app = express();
const port = 3000;


app.listen(3000, () => {
    console.log("listening on port " + port);
})