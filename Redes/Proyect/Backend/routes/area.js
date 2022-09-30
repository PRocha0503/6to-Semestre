const { Router } = require("express");

const { addArea, getAreas } = require("../controllers/area.js");
const { validateJWT, isAdmin } = require("../middleware");

const router = Router();

router.post("/", [validateJWT, isAdmin], addArea);
router.get("/", [validateJWT], getAreas);

module.exports = router;
