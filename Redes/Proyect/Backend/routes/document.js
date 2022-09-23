const { Router } = require("express");

const {
	loadDocument,
	downloadFile,
	previewFile,
	addDocument,
	getDocumentDetails,
	getDocuments,
} = require("../controllers/document.js");
const { validateJWT, createLog, isDocument } = require("../middleware");

const router = Router();

const logType = "Document";

router.get("/", [validateJWT, createLog(logType)], getDocuments);

router.post("/", [validateJWT, createLog(logType)], addDocument);

router.post(
	"/load/:id",
	[validateJWT, isDocument, createLog(logType)],
	loadDocument
);

router.get(
	"/:id",
	[validateJWT, isDocument, createLog(logType)],
	getDocumentDetails
);

router.get(
	"/download/:id",
	[validateJWT, isDocument, createLog(logType)],
	downloadFile
);

router.get(
	"/preview/:id",
	[validateJWT, isDocument, createLog(logType)],
	previewFile
);

module.exports = router;
