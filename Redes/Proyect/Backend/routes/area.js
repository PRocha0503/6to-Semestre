const { Router } = require("express");

const { addArea } = require("../controllers/area.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/", [validateJWT], addArea);

module.exports = router;
