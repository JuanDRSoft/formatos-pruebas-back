const User = require("../models/User");
const helpers = require("./helpers");

const validParams = ["name", "phone", "email", "uid"];

async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);

  User.create(params)
    .then((lawyer) => {
      res.json(lawyer);
      req.lawyer = lawyer;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error,
      });
    });
}

function index(req, res) {
  User.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}

function show(req, res) {
  res.json(req.lawyer);
}

module.exports = { index, show, create };
