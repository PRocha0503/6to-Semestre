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
	permissions: [
		{
			type: Schema.Types.ObjectId,
			ref: "Permission",
		},
	],
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	return user;
};

module.exports = model("User", UserSchema);
