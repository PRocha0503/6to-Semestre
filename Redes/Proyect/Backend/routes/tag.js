const { Router } = require("express");

const { addTag, getTags } = require("../controllers/tag.js");
const { validateJWT, isArea } = require("../middleware");

const router = Router();

router.post("/:area", [validateJWT, isArea], addTag);
router.get("/:area", [validateJWT, isArea], getTags);

module.exports = router;
