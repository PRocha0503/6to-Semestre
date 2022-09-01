const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//Helper function to create access and refresh JWT
const createJWT = async (uid = " ") => {
	try {
		const payload = { uid };
		const accessToken = await jwt.sign(payload, process.env.SECRETACCESS, {
			expiresIn: "1h",
		});
		const refreshToken = await jwt.sign(payload, process.env.SECRETREFRESH, {
			expiresIn: "3d",
		});
		return {
			accessToken,
			refreshToken,
		};
	} catch (e) {
		throw new Error("Could not generate tokens");
	}
};

//Function to login a user
const login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	try {
		if (!user) {
			return res.status(400).json({ msg: "User does not exist" });
		}
		//Validate password
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res
				.status(400)
				.json({ msg: "Invalid User/Password --incorrect password" });
		}
		//Genetate JWT
		const { accessToken, refreshToken } = await createJWT(user.id);
		res
			.cookie("accessToken", accessToken, { httpOnly: true })
			.send({ refreshToken });
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: "Talk to admin",
		});
	}
};

//Function to refresh a user tokens
// TODO: Implement correctly
const refreshTokens = async (req, res) => {
	const { accessToken, refreshToken } = await createJWT("ss");
	res
		.cookie("accessToken", accessToken, { httpOnly: true })
		.send({ refreshToken });
};

module.exports = {
	login,
};
