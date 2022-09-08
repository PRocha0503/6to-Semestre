const Tag = require("../models/tag");

//Function to add a tag to the database
const addTag = async (req, res) => {
	try {
		const { name } = req.body;

		//Create user
		const tag = new Tag({ name });

		//Save to db
		await tag.save();
		res.status(201).json({
            id: tag._id,
            name: tag.name,
		});
	} catch (e) {
        switch(e.code){
            case 11000:
                res.status(400).send({
                    "message": "Tag already exists",
                });
                break;
            default:
                res.status(500).send({ message: "Internal server error" });
        }
	}
};

// Function to get all tags
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        const response = tags.map((tag) => { return { id: tag._id, name: tag.name } });
        res.status(200).json(response)
    } catch (e) {
        res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = {
	addTag,
    getTags,
};
