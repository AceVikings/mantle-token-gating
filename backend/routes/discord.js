const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  getStats,
} = require("../controllers/userController");
const {
  getServerStats,
  getServer,
  addGate,
} = require("../controllers/serverController");
require("dotenv").config();

router.route("/").post(createUser).get(getStats);
router.route("/:id").get(getUser);
router.route("/server/:id").get(getServer).post(addGate);
router.route("/server").get(getServerStats);
module.exports = router;
