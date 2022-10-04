const { Schema, model } = require("mongoose");

const LogSchema = Schema({
	type: {
		type: String,
		required: [true, "Type is mandatory"],
		enum: ["User", "Document", "Area", "Tag", "Permission", "Folder", "Other"],
	},
	method: {
		type: String,
		required: [true, "Method is mandatory"],
	},
	endpoint: {
		type: String,
		required: [true, "Endpoint is mandatory"],
	},
	message: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User is mandatory"],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model("Log", LogSchema);
