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

userLocalSchema.index({ id: 1, server: 1 }, { unique: true });

module.exports = mongoose.model("UserLocal", userLocalSchema);
