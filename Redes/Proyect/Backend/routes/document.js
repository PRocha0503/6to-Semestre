const { Router } = require("express");

const {
	loadDocument,
	downloadFile,
	previewFile,
	addDocument,
	getDocumentDetails,
	getDocuments,
	queryDocuments,
	batchDocuments,
	getLogs,
	getBatches,
	rollBackBatch,
} = require("../controllers/document.js");
const { validateJWT, createLog, isDocument } = require("../middleware");

const router = Router();

const logType = "Document";

router.get(
	"/",
	[validateJWT, createLog(logType, "Se obtuvo un documento")],
	getDocuments
);

router.post(
	"/",
	[validateJWT, createLog(logType, "Se subio un docuemnto")],
	addDocument
);

router.post(
	"/load/:id",
	[validateJWT, isDocument, createLog(logType)],
	loadDocument
);

router.get("/query", [validateJWT], queryDocuments);

router.get(
	"/download/:id",
	[validateJWT, isDocument, createLog(logType, "Se descargo un doucmento")],
	downloadFile
);

router.get(
	"/preview/:id",
	[validateJWT, isDocument, createLog(logType)],
	previewFile
);

router.get("/logs/:id", [validateJWT, isDocument, createLog(logType)], getLogs);

router.get("/batch", [validateJWT, createLog(logType)], getBatches);
router.post("/batch", [validateJWT, createLog(logType)], batchDocuments);
router.post(
	"/batch/:id/rollback",
	[validateJWT, createLog(logType)],
	rollBackBatch
);

router.post("/", [validateJWT, createLog(logType)], addDocument);

router.get(
	"/:id",
	[validateJWT, isDocument, createLog(logType)],
	getDocumentDetails
);

module.exports = router;
