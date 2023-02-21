const asyncHandler = require("express-async-handler");
require("dotenv").config();
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const serverGate = require("../models/serverGate");

const getServerStats = asyncHandler(async (req, res) => {
  try {
    let count = await serverGate.countDocuments();
    res.status(200).json({
      server_count: count,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const getServer = asyncHandler(async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let server = await serverGate.findOne({ id: id });
    res.status(200).json(server);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const addGate = asyncHandler(async (req, res) => {
  try {
    const getServer = await serverGate.findOne({ id: req.params.id });
    if (!getServer) {
      const newServer = await serverGate.create({
        id: req.params.id,
        gate: [
          {
            type: req.body.type,
            contract: req.body.contract,
            balance: req.body.balance,
            role: req.body.role,
          },
        ],
      });
      res.status(201).json(newServer);
    } else {
      getServer.gate.push({
        type: req.body.type,
        contract: req.body.contract,
        balance: req.body.balance,
        role: req.body.role,
      });
      const server = await serverGate.findByIdAndUpdate(
        getServer._id,
        getServer
      );
      res.status(200).json(server);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
  //   else{
  //     const server = await serverGate.findByIdAndUpdate()
  //   }
});

module.exports = { getServerStats, getServer, addGate };
