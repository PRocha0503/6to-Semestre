const { Schema, model } = require("mongoose");

const PermissionSchema = Schema({
	path: {
		type: String,
		required: [true, "Path is mandatory"],
	},
	type: [
		{
			type: Array,
			enum: ["R", "W", "D", "MA", "SA"],
		},
	],
});

module.exports = model("Permission", PermissionSchema);
