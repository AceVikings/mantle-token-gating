const mongoose = require("mongoose");

const userGlobalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("userGlobal", userGlobalSchema);
