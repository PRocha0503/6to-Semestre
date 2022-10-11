const { Router } = require("express");

const { addTag, getTags, deleteTag } = require("../controllers/tag.js");
const { validateJWT, isArea, isTag } = require("../middleware");

const router = Router();

router.post("/:area", [validateJWT, isArea], addTag);
router.get("/:userID", [validateJWT], getTags);
router.delete("/:area/:tagId", [validateJWT, isTag, isArea], deleteTag);

module.exports = router;
