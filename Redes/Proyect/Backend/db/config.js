const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		if (process.env.NODE_ENV === "test") {
			console.log("TEST DATABASE");
			mongoose.connect(process.env.MONGODB_TEST, {});
		} else {
			mongoose.connect(process.env.MONGO, {});
		}
		
		console.log("Connected to Mongo");
	} catch (err) {
		console.log(err);
		throw new Error("Couldn't connect to Mongo'");
	}
};

module.exports = {
	dbConnection,
};
