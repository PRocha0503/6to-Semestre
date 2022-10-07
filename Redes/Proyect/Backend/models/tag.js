const { Schema, model } = require("mongoose");

const TagSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
	},
	color: {
		type: String,
		required: [true, "Color is mandatory"],
	},
	icon: {
		type: String,
		required: [true, "Icon is mandatory"],
	},
});

module.exports = model("Tag", TagSchema);
