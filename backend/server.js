const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 9000;

app.get("/:id", (req, res) => {
  console.log("Here");
  res.status(200).json({
    message: "hi",
    id: req.params.id,
  });
});

app.listen(PORT, console.log(`Listening on PORT: ${PORT}`));
