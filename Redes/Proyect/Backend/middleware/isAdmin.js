const User = require("../models/user");

const isAdmin = async (req, res, next) => {
	try {
		if (req.user.isAdmin) {
			next();
		} else {
			return res.status(401).send({ message: "Unauthorized" });
		}
	} catch (err) {
		res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	isAdmin,
};
