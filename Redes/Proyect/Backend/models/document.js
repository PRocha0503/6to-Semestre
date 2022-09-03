const { Schema, model } = require("mongoose");

const DocumentSchema = Schema({
	title: {
		type: String,
		required: [true, "Title is mandatory"],
		unique: true,
	},
	file: {
		type: Buffer,
		required: [true, "File is mandatory"],
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Created by is mandatory"],
	},
	path: {
		type: String,
		default: "/",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	logs: [
		{
			type: Schema.Types.ObjectId,
			ref: "Log",
		},
	],
	metadata: {
		type: Object,
	},
});

module.exports = model("Document", DocumentSchema);