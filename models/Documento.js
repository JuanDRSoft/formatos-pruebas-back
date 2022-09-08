const mongoose = require("mongoose");

let documentShema = new mongoose.Schema({
  name: String,
  numID: String,
  adress: String,
  factory: String,
  city: String,
  phone: String,
  email: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Documento = mongoose.model("Documento", documentShema);

module.exports = Documento;
