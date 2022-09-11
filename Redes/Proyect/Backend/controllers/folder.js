const { populate } = require("../models/folder");
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
			parentFolder.insideFolders.push(folder);
			parentFolder.save();
			folder.path = parentFolder.path + "/" + name;
		}
		folder.logs.push(req.log);

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

//Function to get root folders
const rootFolders = async (req, res) => {
	try {
		const folders = await Folder.find({
			path: { $regex: /^\/[^\/]*$/ },
		}).populate([
			{ path: "insideDocuments", select: '"_id title createdBy path tags"' },
			"insideFolders",
		]);
		res.json(folders);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

const getFolder = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const folder = await Folder.findOne({ _id }).populate([
			{
				path: "insideDocuments",
				select: '_id title createdBy path tags logs',
			},
			"insideFolders",
			{
				path: "logs",
				populate: { path: "user", select: '_id username' },
			}
			
		]);
		console.log(folder)
		folder.logs.push(req.log);
		//Save to db
		await folder.save();
		res.json(folder);
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
