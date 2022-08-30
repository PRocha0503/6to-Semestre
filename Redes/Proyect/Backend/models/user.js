const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
	},
	password: {
		type: String,
		required: [true, "Name is mandatory"],
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
	// user.uid = _id;
	return user;
};

module.exports = model("User", UserSchema);
