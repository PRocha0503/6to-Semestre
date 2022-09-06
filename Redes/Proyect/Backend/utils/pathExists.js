const Folder = require("../models/folder");
const Document = require("../models/document");

const pathExists = async (path) => {
	if (path == "/") {
		return true;
	}
	const folder = await Folder.findOne({ path });
	const doc = await Document.findOne({ path });
	if (!doc && !folder) {
		throw new Error("Path does not exist");
	}
	return true;
};

module.exports = {
	pathExists,
};
