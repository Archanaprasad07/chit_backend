const express = require("express");
const Payment = require("../models/paymentModel");
const router = express.Router();

router.post("/payments", async (req, res) => {
  try {
    const { userId, month, amount } = req.body;
    const payment = new Payment({ userId, month, amount });
    await payment.save();
    res.status(201).json({ message: "Payment successful" });
  } catch (error) {
    console.error("Error making payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
