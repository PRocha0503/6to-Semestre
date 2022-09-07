const { Router } = require("express");

const {
	createFolder,
	getFolder,
	rootFolders,
} = require("../controllers/folder.js");
const { validateJWT, createLog } = require("../middleware");

const router = Router();
const logType = "Folder";

router.post("/", [validateJWT, createLog(logType)], createFolder);

router.get("/:id", [validateJWT, createLog(logType)], getFolder);

router.get("/", rootFolders);

module.exports = router;
