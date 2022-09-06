const Document = require("../models/document");
const Folder = require("../models/folder");
const stream = require("stream");

//Function to add document to the database
const loadDocument = async (req, res) => {
	try {
		//Get file and filename
		let { file } = req.files;
		const title = file.name;
		file = file.data;
		const createdBy = req.user;

		const path = "/" + title;

		//Create document
		const document = new Document({ title, file, createdBy, path });
		document.logs = [req.log];

		//Save to db
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
const addDocumentData = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const { tags, metadata, parent } = req.body;
		const document = await Document.findOne({ _id });
		document.logs.push(req.log);
		document.metadata = metadata;
		document.tags = tags;
		if (parent) {
			const parentFolder = await Folder.findOne({ _id: parent });
			parentFolder.inside.push(document);
			parentFolder.save();
			document.path = parentFolder.path + "/" + document.title;
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
};

//Function to preview a file
const previewFile = async (req, res) => {
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
};

module.exports = {
	loadDocument,
	addDocumentData,
	downloadFile,
	previewFile,
};
