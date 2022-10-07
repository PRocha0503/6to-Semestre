const { validateJWT } = require("./validateJWT");
const { createLog } = require("./createLog");
const { isArea } = require("./isArea");
const { isDocument } = require("./isDocument");
const { isAdmin } = require("./isAdmin");
const { userHasAccess } = require("./userHasAccess");
const { isTag } = require("./isTag");

module.exports = {
	validateJWT,
	createLog,
	isArea,
	isDocument,
	isAdmin,
	userHasAccess,
	isTag,
};
