const Area = require("../models/area");

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

module.exports = {
	addArea,
	getAreas,
};
