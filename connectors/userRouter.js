const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Chit = require("../models/chitModel");
const User = require("../models/userModel");
const Payment = require("../models/paymentModel");
const router = express.Router();

router.get("/chit/details/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    console.log("UserID:", userId);

    // Find the user by userId
    const user = await User.findOne({ userid: userId });

    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User:", user);

    // Find the chit document for the user's chitId
    const chit = await Chit.findOne({ chitId: user.chitId });

    if (!chit) {
      console.error("Chit not found for user:", user);
      return res.status(404).json({ error: "Chit not found for the user" });
    }

    console.log("Chit:", chit);

    res.status(200).json(chit);
  } catch (error) {
    console.error("Error viewing chit details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for placing bids for a specific month
router.post("/chit/bid", async (req, res) => {
  try {
    const { username, bidAmount } = req.body;

    // Find the chit document for the specified month
    const chit = await Chit.findOne({ installments });

    if (!chit) {
      return res
        .status(404)
        .json({ error: "Chit not found for the specified month" });
    }

    // Add the bid to the bids array
    chit.bids.push({ username, bidAmount });

    // Save the updated chit document
    await chit.save();

    res.status(201).json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for viewing payment history
router.get("/paymentsuser", async (req, res) => {
  try {
    const { userId } = req.body;

    // Find all payments made by the user
    const payments = await Payment.find({ userId });

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
