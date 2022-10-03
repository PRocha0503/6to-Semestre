const Document = require("../models/document");
const userHasAccess = (req, res, next) => {
	try {
		const document = req.doc;
		req.user.areas.forEach((area) => {
			if (document.area == area) {
				next();
			}
		});
		return res.status(401).send({ message: "Unauthorized" });
	} catch (err) {
		return res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	userHasAccess,
};
