const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = user = mongoose.model("user", UserSchema);
