const User = require("../models/user");
const bcryptjs = require("bcryptjs");

//Function to add a suer to the database
const addUser = async (req, res, permissions) => {
	const { username, password } = req.body;

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
};

module.exports = {
	addUser,
};
