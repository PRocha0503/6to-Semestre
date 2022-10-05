const { Router } = require("express");

const {
	addArea,
	getAreas,
	getUserAvailableAreas,
} = require("../controllers/area.js");
const { validateJWT, isAdmin } = require("../middleware");

const router = Router();

router.post("/", [validateJWT, isAdmin], addArea);
router.get("/", [validateJWT], getAreas);
router.get("/:userId", [validateJWT], getUserAvailableAreas);

module.exports = router;
