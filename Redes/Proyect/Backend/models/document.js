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
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	area: [
		{
			type: Schema.Types.ObjectId,
			ref: "Area",
		},
	],
	logs: [
		{
			type: Schema.Types.ObjectId,
			ref: "Log",
		},
	],
});

module.exports = model("Document", DocumentSchema);
