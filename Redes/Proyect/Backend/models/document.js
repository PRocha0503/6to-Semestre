const { Schema, model } = require("mongoose");

const DocumentSchema = Schema({
	title: {
		type: String,
		required: [true, "Title is mandatory"],
		unique: true,
	},
	file: {
		type: Buffer,
	},

	folio: {
		type: String,
		required: [true, "Folio by is mandatory"],
	},
	expediente: {
		type: String,
		required: [true, "Expediente by is mandatory"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	size: {
		type: Number,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Created by is mandatory"],
	},
	area: {
		type: Schema.Types.ObjectId,
		ref: "Area",
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
