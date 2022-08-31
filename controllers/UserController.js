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

function update(req, res) {
  req.user = Object.assign(req.user, req.body);
  req.user
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function find(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function destroy(req, res) {
  req.user
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function findByEmail(req, res, next) {
  let { email, uid } = helpers.buildParams(validParams, req.body);
  User.findOne({ email: email, uid: uid })
    .then((user) => {
      req.user = user;
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = { index, show, create, update, find, destroy, findByEmail };
