const User = require("../models/user");
const bcryptjs = require("bcryptjs");

//Function to add a suer to the database
const addUser = async (req, res) => {
	try {
		const { username, password, permissions } = req.body;

		//Create user
		const user = new User({ username, password, permissions });

		//Encrypt password
		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync(password, salt);

		//Save to db
		await user.save();
		res.json({
			user,
		});
	} catch (e) {
		res.status(400).send({
			e,
		});
	}
};

module.exports = {
	addUser,
};
