const User = require("../models/user");

const postUser = async (req, res) => {
	const user = new User({ name: "Stephan", password: "123" });
	await user.save();
	res.json({
		user,
	});
};

module.exports = {
	postUser,
};
