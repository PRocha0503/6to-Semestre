const { Router } = require("express");

const { addDocument, download } = require("../controllers/document.js");
const { validateJWT } = require("../middleware");

const router = Router();

router.post("/", validateJWT, addDocument);

router.get("/downlaod", download);

module.exports = router;
