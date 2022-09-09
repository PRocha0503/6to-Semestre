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
	insideFolders: [
		{
			type: Schema.Types.ObjectId,
			ref: "Folder",
		},
	],
	insideDocuments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Document",
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
	logs: [
		{
			type: Schema.Types.ObjectId,
			ref: "Log",
		},
	],
});

FolderSchema.methods.toJSON = function () {
	const { _id, __v, ...folder } = this.toObject();
	folder["id"] = _id;
	return folder;
};

module.exports = model("Folder", FolderSchema);
