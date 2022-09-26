const Area = require("../models/area");
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
};
