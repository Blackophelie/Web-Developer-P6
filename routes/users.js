const express = require("express");
const { route } = require("../app");
const userCtrl = require("../controllers/users");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();

router.post("/signup", auth, multer, userCtrl.signup);
router.post("/login", auth, multer, userCtrl.login);

module.exports = router;