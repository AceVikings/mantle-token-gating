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
        require: true,
      },
      contract: {
        type: String,
        require: true,
      },
      balance: {
        type: String,
        require: true,
      },
      role: {
        type: String,
        require: true,
      },
    },
  ],
});

module.exports = mongoose.model("serverGate", serverGateSchema);
