const Folder = require("../models/folder");

//Function to add a folder
const createFolder = async (req, res) => {
	try {
		const { name, tags, parent } = req.body;
		const createdBy = req.user;

		//Create folder
		const path = "/" + name;
		const folder = new Folder({ name, tags, createdBy, path });

		//Look for parent folder
		if (parent) {
			const parentFolder = await Folder.findOne({ _id: parent });
			parentFolder.inside.push(folder);
			parentFolder.save();
			folder.path = parentFolder.path + "/" + name;
		}

		//Save to db
		await folder.save();
		res.json({
			folder,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

//Function to get a folder
const getFolder = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const folder = await Folder.findOne({ _id }).populate([
			"inside",
			"createdBy",
		]);
		res.json({
			folder,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

//Function to get root folders
const rootFolders = async (req, res) => {
	try {
		const folders = await Folder.find({
			path: { $regex: /^\/[^\/]*$/ },
		}).populate(["inside", "createdBy"]);
		res.json(folders);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

module.exports = {
	createFolder,
	getFolder,
	rootFolders,
};
