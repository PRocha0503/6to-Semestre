const User = require("../models/user");
const Area = require("../models/area");
const bcryptjs = require("bcryptjs");
//Function to get users from the database
const getUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate("areas");
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

const removeArea = async (req, res) => {
	try {
		const { areaId } = req.body;
		const { userId } = req.params;

		const user = await User.findById(userId);
		const area = await Area.findById(areaId);
		if (!area) {
			res.status(404).send({ message: "Area not found" });
			return;
		}
		if (!user.areas.includes(areaId)) {
			console.log(user.areas);
			res.status(400).send({ message: "Area not in user" });
			return;
		}
		user.areas.remove(area);
		await user.save();
		res.json({
			user,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findByIdAndDelete(userId);
		res.json({
			user,
		});
	} catch (e) {
		res.status(400).send({
			e,
		});
	}
};

const makeAdmin = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		user.isAdmin = true;
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

const getProfile = async (req, res) => {
	try {
		const { user } = req;
		const fullUser = await User.findById(user._id).populate({
			path: "areas",
			populate: {
				path: "tags",
			},
		});

		res.json({ user: fullUser });
	} catch (e) {
		res.status(400).send({
			message: e.message,
		});
	}
};

module.exports = {
	getUsers,
	addUser,
	addArea,
	removeArea,
	deleteUser,
	makeAdmin,
	getProfile,
};
