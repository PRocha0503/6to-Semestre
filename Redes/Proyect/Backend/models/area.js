const { Schema, model } = require("mongoose");

const AreaSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
		unique: true,
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	encryption: {
		key: {
			type: String,
			required: [true, "Key is mandatory"],
		},
		iv: {
			type: String,
			required: [true, "IV is mandatory"],
		},
	},
});

module.exports = model("Area", AreaSchema);
