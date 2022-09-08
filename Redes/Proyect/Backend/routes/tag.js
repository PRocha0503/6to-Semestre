const { Router } = require("express");

const { addTag, getTags } = require("../controllers/tag.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/",validateJWT,  addTag);
router.get("/", validateJWT, getTags);

module.exports = router;
