const { Schema, model } = require("mongoose");

const BatchSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Created by is mandatory"],
    },
    status: {
        type: String,
        default: "pending",
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: "Area",
    },
    items: {
        type: Number,
    },
    size: {
        type: Number,
    },
});

module.exports = model("Batch", BatchSchema);
