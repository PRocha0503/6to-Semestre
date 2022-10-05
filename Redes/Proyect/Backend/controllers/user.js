const User = require("../models/user");
const Area = require("../models/area");
const bcryptjs = require("bcryptjs");
//Function to get users from the database
const getUsers = async (req, res) => {
	try {
		const users = await User.find({}, "-isAdmin").populate(
			"areas",
			"-_id name"
		);
		res.json({
			users,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};
//Function to add a suer to the database
const addUser = async (req, res) => {
	try {
		const { username, password, areas } = req.body;

		//Create user
		const user = new User({ username, password, areas});

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

const addArea = async (req, res) => {
	try {
		const { areaId } = req.body;
		const { userId } = req.params;

		const user = await User.findById(userId).populate("areas");
		const area = await Area.findById(areaId);
		if (!area) {
			res.status(404).send({ message: "Area not found" });
			return;
		}
		if (user.areas.includes(areaId)) {
			res.status(400).send({ message: "Area already added" });
			return;
		}
		user.areas.push(area);
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
	getUsers,
	addUser,
	addArea,
};
