const { Router } = require("express");
const User = require("../models/user");
const { login } = require("../controllers/auth.js");

const router = Router();

router.post("/login", login);
module.exports = router;
