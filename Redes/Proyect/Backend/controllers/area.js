const Area = require("../models/area");
const User = require("../models/user");
//Function to get all areas from the database
const getAreas = async (req, res) => {
	try {
		const areas = await Area.find({});
		res.json({
			areas,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

//Function to add a suer to the database
const addArea = async (req, res) => {
	try {
		const { name } = req.body;

		//Create user
		const area = new Area({ name });

		//Save to db
		await area.save();
		res.json({
			area,
		});
	} catch (e) {
		res.status(400).send({
			e,
		});
	}
};

const getUserAvailableAreas = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		const areas = await Area.find({});
		if (!user) {
			res.status(404).send({ message: "User not found" });
			return;
		}
		const filteredAreas = areas.filter((area) => {
			return !user.areas.includes(area.id);
		});
		res.json({
			areas: filteredAreas,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

module.exports = {
	addArea,
	getAreas,
	getUserAvailableAreas,
};
