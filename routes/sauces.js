const express = require("express");
const router = express.Router();

const sauceCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, multer, sauceCtrl.deleteSauce);
router.get("/:id", auth, multer, sauceCtrl.getOneSauce);
router.get("/:id", auth, multer, sauceCtrl.getAllSauces);

module.exports = router;