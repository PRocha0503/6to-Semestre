const { Schema, model } = require("mongoose");

const TagSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
	},
});

module.exports = model("Tag", TagSchema);
