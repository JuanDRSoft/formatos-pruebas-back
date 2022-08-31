const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  uid: String,
  city: String,
  department: String,
  address: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
