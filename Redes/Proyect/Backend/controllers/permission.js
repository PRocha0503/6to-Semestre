const Permission = require("../models/permission");

//Function to add an area to the database
const addPermission = async (req, res) => {
	try {
		const { path, types } = req.body;
		const options = ["R", "W", "D", "SA"];
		const type = [];

		for (t of types) {
			if (!options.includes(t)) {
				return res.status(300).send({
					msg: "Incorrect permission type",
				});
			}
			type.push(t);
		}

		//Create permisios
		const permission = new Permission({ path, type });

		//Save to db
		await permission.save();

		res.json({
			permission,
		});
	} catch (e) {
		res.status(400).send({
			e,
		});
	}
};

module.exports = {
	addPermission,
};