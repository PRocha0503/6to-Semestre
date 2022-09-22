const Document = require("../models/document");
const stream = require("stream");

//Function to add document to the database
const loadDocument = async (req, res) => {
	try {
		//Get file and filename
		let { file } = req.files;
		const title = file.name;
		file = file.data;
		const createdBy = req.user;
		const size = file.length; //In bytes

		const path = "/" + title;

		//Create document
		const document = new Document({ title, file, createdBy, path, size });
		document.logs = [req.log];

		//Save to db
		await document.save();
		res.json({
			id: document._id,
			title: document.title,
		});
	} catch (e) {
		switch (e.code) {
			case 11000:
				res.status(400).json({ message: "Document already exists" });
				break;
			default:
				res.status(500).send({
					message: "Internal server error",
				});
		}
	}
};
const addDocumentData = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const { tags, metadata, parent } = req.body;
		const document = await Document.findOne({ _id }, "-file");
		document.logs.push(req.log);
		document.metadata = metadata;
		document.tags = tags;
		if (parent) {
			// const parentFolder = await Folder.findOne({ _id: parent });
			// parentFolder.insideDocuments.push(document);
			// document.path = parentFolder.path + "/" + document.title;
			// parentFolder.save();
		} else {
			document.path = "/" + document.title;
		}
		await document.save();
		res.json({
			document,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

//Function to download a file
const downloadFile = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const document = await Document.findOne({ _id });
		document.logs.push(req.log);
		await document.save();
		let fileContents = Buffer.from(document.file, "base64");

		let readStream = new stream.PassThrough();
		readStream.end(fileContents);

		res.set("Content-disposition", "attachment; filename=" + document.title);
		res.set("Content-Type", "application/pdf");

		readStream.pipe(res);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

//Function to preview a file
const previewFile = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const document = await Document.findOne({ _id });
		document.logs.push(req.log);
		await document.save();

		let fileContents = Buffer.from(document.file, "base64");

		let readStream = new stream.PassThrough();
		readStream.end(fileContents);

		res.set("Content-disposition", "inline; filename=" + document.title);
		res.set("Content-Type", "application/pdf");

		readStream.pipe(res);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

//Function to get root documents
const rootDocuments = async (req, res) => {
	try {
		const doc = await Document.find(
			{
				path: { $regex: /^\/[^\/]*$/ },
			},
			"_id title createdBy path tags"
		);
		res.json(doc);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

const getDocumentDetails = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const doc = await Document.findOne({ _id }, "-file").populate({
			path: "logs",
			populate: { path: "user", select: "_id username" },
		});
		res.json(doc);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

module.exports = {
	loadDocument,
	addDocumentData,
	downloadFile,
	previewFile,
	rootDocuments,
	getDocumentDetails,
};
