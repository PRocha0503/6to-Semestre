const Document = require("../models/document");

const isDocument = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(id)
		const doc = await Document.findOne({_id:id}, "-file");
		if (!doc) {
			res.status(404).send({ message: "Document not found" });
		}
		req.doc = doc;
		next();
	} catch (err) {
		res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	isDocument,
};
