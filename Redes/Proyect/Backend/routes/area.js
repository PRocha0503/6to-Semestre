const { Router } = require("express");

const { addArea } = require("../controllers/area.js");
const { validateJWT, isAdmin } = require("../middleware");

const router = Router();

router.post("/", [validateJWT, isAdmin], addArea);

module.exports = router;
