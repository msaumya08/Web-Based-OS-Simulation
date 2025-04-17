const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/login-demo");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});
app.get("/", (req, res) => {
  res.send("API is working!");
});
app.get("/create-user", async (req, res) => {
  const newUser = new User({
    username: "testuser",
    password: "test123",
  });

  await newUser.save();
  res.send("Test user created");
});
app.get("/delete-user", async (req, res) => {
  await User.deleteMany({ username: "testuser" });
  res.send("Test user deleted");
});
app.get("/get-users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
