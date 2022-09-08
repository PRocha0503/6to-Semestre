const { Schema, model } = require("mongoose");

const TagSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
		unique: true,
	},
});

module.exports = model("Tag", TagSchema);
