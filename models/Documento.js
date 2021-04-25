const mongoose = require("mongoose");

let documentShema = new mongoose.Schema({
  name: String,
  numID: String,
  adress: String,
  factory: String,
  city: String,
  phone: String,
  email: String,
});

const Documento = mongoose.model("Documento", documentShema);

module.exports = Documento;
