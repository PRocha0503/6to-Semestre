const Tag = require("../models/tag");

const isTag = (req, res, next) => {
	const { tagId } = req.params;
	const tag = Tag.findById(tagId);
	if (!tag) {
		res.status(404).send({ message: "Tag not found" });
		return;
	}
	req.tag = tag;
	next();
};

module.exports = {
	isTag,
};
