// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String,    required: true,
 unique: true },
  phonenumber: String,
  student: String,
});

module.exports = mongoose.model("User", userSchema);