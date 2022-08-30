const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	console.log(req.cookies);
	const { accessToken: token } = req.cookies;
	if (!token) {
		return res.status(401).json({
			msg: "NO TOKEN",
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.SECRETACCESS);
		// const user = await User.findById(uid);
		// if (!user.state || !user) {
		// 	return res.status(401).json({
		// 		msg: "INVALID TOKEN",
		// 	});
		// }
		// req.user = user;
		req.userID = uid;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({
			msg: "INVALID TOKEN",
		});
	}
};

module.exports = {
	validateJWT,
};
