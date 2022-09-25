const Area = require("../models/area");

const isArea = async (req, res, next) => {
	try {
		const { area: name } = req.params;
		const area = await Area.findOne({ name }).populate("tags");
		if (!area) {
			res.status(404).send({ message: "Area not found" });
		}
		req.area = area;
		next();
	} catch (err) {
		res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	isArea,
};
