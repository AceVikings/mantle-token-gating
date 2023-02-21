const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const userGlobal = require("../models/userGlobal");
const userLocal = require("../models/userLocal");

const getStats = asyncHandler(async (req, res) => {
  try {
    let globalCount = await userGlobal.countDocuments();
    let localCount = await userLocal.countDocuments();
    res.status(200).json({
      local_count: localCount,
      global_count: globalCount,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
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

const createUser = asyncHandler(async (req, res) => {
  let token = req.body.token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  if (
    await verifyMessage({
      message: token,
      address: req.body.address,
      signature: req.body.signature,
    })
  ) {
    try {
      if (decoded.server == null) {
        const getUser = await userGlobal.findOne({ id: decoded.id });
        if (!getUser) {
          const user = new userGlobal({
            id: decoded.id,
            address: req.body.address,
          });
          const newUser = await user.save();
          return res.status(201).json(newUser);
        } else {
          const userUpdate = await userGlobal.findByIdAndUpdate(
            getUser._id,
            {
              id: decoded.id,
              address: req.body.address,
            },
            { returnNewDocument: true, returnOriginal: false }
          );
          return res.status(200).json(userUpdate);
        }
      } else {
        const getUser = await userLocal.findOne({
          id: decoded.id,
          server: decoded.server,
        });
        if (!getUser) {
          const user = await userLocal({
            id: decoded.id,
            address: req.body.address,
            server: decoded.server,
          });
          const newUser = await user.save();
          return res.status(201).json(newUser);
        } else {
          const userUpdate = await userLocal.findByIdAndUpdate(
            getUser._id,
            {
              id: decoded.id,
              address: req.body.address,
              server: decoded.server,
            },
            { returnNewDocument: true, returnOriginal: false }
          );
          return res.status(200).json(userUpdate);
        }
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  } else {
    return res.status(400).json({ message: "Inavlid signature" });
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
    return false;
  }
};

module.exports = { createUser, getUser, getStats };
