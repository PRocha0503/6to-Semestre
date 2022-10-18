const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//Function to validate user JWT
const validateJWT = async (req = request, res = response, next) => {
	const { accessToken: token } = req.cookies;
	console.log("HAS ACCESS TOKEN", token);
	if (!token) {
		return res.status(401).json({
			msg: "NO TOKEN",
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.SECRETACCESS);
		console.log("UID", uid);
		const user = await User.findById(uid).populate("areas");
		if (!user) {
			return res.status(401).json({
				msg: "TOKEN INVALIDO",
			});
		}
		req.user = user;
		next();
	} catch (err) {
		// console.log(err);
		return res.status(401).json({
			msg: "TOKEN INVALIDO",
		});
	}
};

module.exports = {
	validateJWT,
};
