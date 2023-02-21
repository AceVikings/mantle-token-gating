const mongoose = require("mongoose");

const serverGateSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  gate: [
    {
      type: {
        type: String,
        required: true,
      },
      contract: {
        type: String,
        required: true,
      },
      balance: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("serverGate", serverGateSchema);
