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
  }
});

router.post("/:id", async (req, res) => {
  let token = req.body.token;
  let id = req.params.id;
  verifyMessage("hello", req.body.address, req.body.signature);
  try {
    if (req.body.server == null) {
      const user = new userGlobal({ id: id, address: req.body.address });
      const newUser = await user.save();
      res.status(201).json(newUser);
    } else {
      const user = await userLocal({
        id: id,
        address: req.body.address,
        server: req.body.server,
      });
      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

const verifyMessage = async ({ message, address, signature }) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = router;
