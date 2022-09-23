const Tag = require("../models/tag");

//Function to add a tag to the database
const addTag = async (req, res) => {
	try {
		const { name } = req.body;

		//Create tag
		const tag = new Tag({ name });

		//Save to db
		await tag.save();

		//Save to area
		const area = req.area;
		area.tags.push(tag);
		await area.save();

		res.status(201).json({
			area: area.name,
			id: tag._id,
			name: tag.name,
		});
	} catch (e) {
		console.log(e);
		switch (e.code) {
			case 11000:
				res.status(400).send({
					message: "Tag already exists",
				});
				break;
			default:
				res.status(500).send({ message: e || "Internal server error" });
		}
	}
};

// Function to get all tags
const getTags = async (req, res) => {
	try {
		const area = req.area;
		const tags = area.tags;
		console.log(tags);
		const response = tags.map((tag) => {
			return { id: tag._id, name: tag.name };
		});
		res.status(200).json(response);
	} catch (e) {
		res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	addTag,
	getTags,
};
