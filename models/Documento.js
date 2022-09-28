const mongoose = require("mongoose");

let documentShema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

const Documento = mongoose.model("Documento", documentShema);

module.exports = Documento;
