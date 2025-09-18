// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serves signup.html, login.html, etc.

// ---- Temporary In-Memory Database ----
let users = []; // [{ username, email, password }]

// SIGNUP ROUTE
app.post("/api/signup", (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // save user
    users.push({ username, email, password });
    console.log("✅ New User Signed Up:", username, email);

    res.json({ success: true, message: "Account created successfully!" });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    // find user
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log("✅ User Logged In:", email);
    res.json({ success: true, message: "Login successful!" });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
