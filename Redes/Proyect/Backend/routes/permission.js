const { Router } = require("express");

const { addPermission } = require("../controllers/permission.js");
const { validateJWT, createLog } = require("../middleware");

const router = Router();

const logType = "Permission";

router.post("/", [validateJWT, createLog(logType)], addPermission);
module.exports = router;
