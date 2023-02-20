const express = require("express");
const router = express.Router();
const userGlobal = require("../models/userGlobal");
const userLocal = require("../models/userLocal");
const ethers = require("ethers");
router.get("/", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    if (req.query.server == null) {
      const user = await userGlobal.findOne({ id: id });
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      } else {
        res.status(200).json(user);
      }
    } else {
      const user = await userLocal.findOne({ id: id });
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
    console.log(err);
  }
});

router.post("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    if (req.query.server == null) {
      const user = new userGlobal.findOne({ id: id });
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      } else {
        res.status(200).json(user);
      }
    } else {
      const user = await userLocal.findOne({ id: id });
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
    console.log(err);
  }
});

module.exports = router;
