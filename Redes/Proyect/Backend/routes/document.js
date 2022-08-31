const { Router } = require("express");

const {
	addDocument,
	downloadFile,
	previewFile,
} = require("../controllers/document.js");
const { validateJWT, createLog } = require("../middleware");

const router = Router();

router.post("/", [validateJWT, createLog("Document")], addDocument);

router.get("/downlaod", downloadFile);

router.get("/preview", previewFile);

module.exports = router;
