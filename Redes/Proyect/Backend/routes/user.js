const { Router } = require("express");

const { addUser } = require("../controllers/user.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/", addUser);

module.exports = router;
