// test/test_helper.js

const mongoose = require("mongoose");
const User = require("../models/user");

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb://localhost:27017/testsDB";
mongoose.connect(MONGODB_URI);

mongoose.connection
	.once("open", () => console.log("Connected!"))
	.on("error", (error) => {
		console.warn("Error : ", error);
	});

// runs before each test
beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		done();
	});
	const admin = new User({
		name: "admin",
		pasword: "test",
		isAdmin: true,
	});
	admin.save().then(() => done());
	const user = new User({
		name: "user",
		pasword: "test",
		isAdmin: false,
	});
	user.save().then(() => done());
});
