const { Schema, model } = require("mongoose");

const AreaSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
		unique: true,
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
});

module.exports = model("Area", AreaSchema);
