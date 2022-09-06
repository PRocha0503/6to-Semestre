const { Schema, model } = require("mongoose");

const FolderSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	inside: [
		{
			type: Schema.Types.ObjectId,
			ref: ["Folder", "Document"],
		},
	],
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Created by is mandatory"],
	},
	path: {
		type: String,
		required: [true, "Path by is mandatory"],
		unique: true,
	},
});

module.exports = model("Folder", FolderSchema);
