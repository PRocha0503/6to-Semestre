const Log = require("../models/log");

//Function to add a suer to the database
const createLog = (type) => {
	return async (req, res, next) => {
		try {
			const endpoint = req.originalUrl;
			const user = req.user;
			//Create user
			const log = new Log({ type, endpoint, user });
			//Save to db
			await log.save();
			next();
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				msg: "Could not create log",
			});
		}
	};
};

module.exports = {
	createLog,
};
