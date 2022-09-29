var express = require("express");
var router = express.Router();
const docx = require("docx");

const DocumentoController = require("../controllers/DocumentController");

router
  .route("/")
  .get(DocumentoController.index)
  .post(DocumentoController.create);

router.route("/:id").get(DocumentoController.find, DocumentoController.show);

router
  .route("/user/:id")
  .get(DocumentoController.findByUser, DocumentoController.show);

module.exports = router;
