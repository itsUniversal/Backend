const router = require("express").Router();
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.patch("/", authController.protect, usersController.editUser);

module.exports = router;
