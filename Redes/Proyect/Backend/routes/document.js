const { Router } = require("express");

const {
	loadDocument,
	downloadFile,
	previewFile,
	addDocumentData,
} = require("../controllers/document.js");
const { validateJWT, createLog } = require("../middleware");

const router = Router();

const logType = "Document";

router.post("/load", [validateJWT, createLog(logType)], loadDocument);

router.get("/downlaod/:id", [validateJWT, createLog(logType)], downloadFile);

router.get("/preview/:id", [validateJWT, createLog(logType)], previewFile);

router.post("/addData/:id", [validateJWT, createLog(logType)], addDocumentData);

module.exports = router;
