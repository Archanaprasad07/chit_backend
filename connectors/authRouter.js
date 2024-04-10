// Import required modules
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel"); // Assuming models are in a separate file

// Create an Express router
const router = express.Router();

router.post("/loginadmin", async (req, res) => {
  try {
    const input = req.body;
    const admin = await Admin.findOne({ username: input.username });
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }
    if (input.password !== admin.password) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: admin,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/register", async (req, res) => {
  try {
    const input = req.body;
    const existingAdmins = await Admin.findOne({ username: input.username });
    if (existingAdmins) {
      return res.status(400).json({
        error: "Admin already exists",
      });
    }
    const admin = new Admin(input);
    await admin.save();
    res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for user login
router.post("/loginuser", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/user/register", async (req, res) => {
  try {
    const input = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ username: input.username });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        error: "Username is already taken",
      });
    }

    // Create a new user instance
    const newUser = new User(input);
    // Save the user to the database
    await newUser.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router
module.exports = router;
