const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {
	const { accessToken, refreshToken } = await createJWT("ss");
	res
		.cookie("accessToken", accessToken, { httpOnly: true })
		.send({ refreshToken });
};
const refreshTokens = async (req, res) => {
	const { accessToken, refreshToken } = await createJWT("ss");
	res
		.cookie("accessToken", accessToken, { httpOnly: true })
		.send({ refreshToken });
};

module.exports = {
	login,
};
