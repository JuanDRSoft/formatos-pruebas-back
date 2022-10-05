const Documento = require("../models/Documento");
const helpers = require("./helpers");
const docx = require("docx");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  SymbolRun,
  UnderlineType,
} = docx;
const validParams = [
  "name",
  "numID",
  "adress",
  "factory",
  "city",
  "phone",
  "email",
  "user",
];
const paragraph = require("../componentes/paragraph");
const { tutela } = require("../componentes/tutela");
const { cartaTCTFVT } = require("../componentes/cartaTCTFVT");
const { contratoTTI } = require("../componentes/contratoTTI");

function find(req, res, next) {
  Documento.findById(req.params.id)
    .then((administrador) => {
      req.administrador = administrador;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function findByUser(req, res, next) {
  Documento.find({ user: req.params.id })
    .sort([["creado", -1]])
    .then((administrador) => {
      req.administrador = administrador;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function index(req, res) {
  Documento.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}
function show(req, res) {
  res.json(req.administrador);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);
  Documento.create(params)
    .then((administrador) => {
      res.json(administrador);
      req.administrador = administrador;
      //next();
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error,
      });
    });
}
function update(req, res) {
  req.administrador = Object.assign(req.administrador, req.body);
  req.administrador
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
function destroy(req, res) {
  req.administrador
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

async function generateDoc(req, res) {
  let params = helpers.buildParams(validParams, req.body);
  tutela(params, res);
}

async function generateCartaTCTFVT(req, res) {
  let params = req.body;
  cartaTCTFVT(params, res);
}

async function generateContratoTTI(req, res) {
  let params = req.body;
  contratoTTI(params, res);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  find,
  generateDoc,
  generateCartaTCTFVT,
  generateContratoTTI,
  findByUser,
};
