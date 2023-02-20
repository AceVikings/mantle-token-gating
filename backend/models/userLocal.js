const mongoose = require("mongoose");

const userLocalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  server: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserLocal", userLocalSchema);
