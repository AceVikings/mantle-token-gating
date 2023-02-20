const mongoose = require("mongoose");

const userLocalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserLocal", userLocalSchema);
