var express = require("express");
var router = express.Router();
const docx = require("docx");

const DocumentoController = require("../controllers/DocumentController");

router
  .route("/")
  .get(DocumentoController.index)
  .post(DocumentoController.generateDoc);

router.route("/cartaTCTFVT").post(DocumentoController.generateCartaTCTFVT);

router.route("/contratoTTI").post(DocumentoController.generateContratoTTI);

router.route("/contratoObra").post(DocumentoController.generateContratoObra);

router
  .route("/llamadoAtencion")
  .post(DocumentoController.generateLlamadoAtencion);

router.route("/solicitudPAL").post(DocumentoController.generateSolicitudPAL);

router
  .route("/autorizacionDSSPT")
  .post(DocumentoController.generateAutorizacionDSSPT);

module.exports = router;
