var express = require("express");
var router = express.Router();

const UserController = require("../controllers/UserController");
var checkAuth = require("../middleware/checkAuth.js");

router.route("/").get(UserController.index).post(UserController.create);

router
  .route("/:id")
  .get(UserController.find, UserController.show)
  .put(UserController.find, UserController.update)
  .delete(UserController.find, UserController.destroy);

router.route("/find/email").post(UserController.findByEmail);

router.post("/perfil", checkAuth, UserController.perfil);

module.exports = router;
