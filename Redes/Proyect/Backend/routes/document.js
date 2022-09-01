const { Router } = require("express");

const {
	loadDocument,
	downloadFile,
	previewFile,
} = require("../controllers/document.js");
const { validateJWT, createLog } = require("../middleware");

const router = Router();

const logType = "Document";

router.post("/load", [validateJWT, createLog(logType)], loadDocument);

router.get("/downlaod", [validateJWT, createLog(logType)], downloadFile);

router.get("/preview", [validateJWT, createLog(logType)], previewFile);

module.exports = router;
