const { Router } = require("express");
const User = require("../models/user");
const { login, logged } = require("../controllers/auth.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/login", login);
router.get("/logged", [validateJWT], logged);
module.exports = router;
