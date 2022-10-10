const Tag = require("../models/tag");

//Function to add a tag to the database
const addTag = async (req, res) => {
	try {
		const { name, color, icon } = req.body;
		console.log(name, color, icon);

		//Create tag
		const tag = new Tag({ name, color, icon });

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
					message: "Tag ya existe",
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
		res.status(200).json(tags);
	} catch (e) {
		res.status(500).send({ message: "Internal server error" });
	}
};

const deleteTag = async (req, res) => {
	try {
		const tag = req.tag;
		const area = req.area;
		area.tags = area.tags.filter((t) => t._id != tag._id);
		await area.save();
		await tag.remove();
		res.status(200).json({ message: "Tag deleted" });
	} catch (e) {
		console.log(e);
		res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	addTag,
	getTags,
	deleteTag,
};
