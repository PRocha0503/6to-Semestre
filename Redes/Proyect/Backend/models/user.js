const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	username: {
		type: String,
		required: [true, "Username is mandatory"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is mandatory"],
	},
	areas: [
		{
			type: Schema.Types.ObjectId,
			ref: "Area",
		},
	],
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	return user;
};

module.exports = model("User", UserSchema);
