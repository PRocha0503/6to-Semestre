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

		//Create document
		const document = new Document({ title, file, createdBy });
		document.logs = [req.log];

		//Save to db
		await document.save();
		res.json({
			document,
		});
	} catch (e) {
		res.status(400).send({
			e,
		});
	}
};

//Function to download a file
const downloadFile = async (req, res) => {
	const { documentName } = req.body;
	const document = await Document.findOne({ title: documentName });
	document.logs.push(req.log);
	await document.save();
	let fileContents = Buffer.from(document.file, "base64");

	let readStream = new stream.PassThrough();
	readStream.end(fileContents);

	res.set("Content-disposition", "attachment; filename=" + documentName);
	res.set("Content-Type", "application/pdf");

	readStream.pipe(res);
};

//Function to preview a file
const previewFile = async (req, res) => {
	const { documentName } = req.body;
	const document = await Document.findOne({ title: documentName });
	document.logs.push(req.log);
	await document.save();

	let fileContents = Buffer.from(document.file, "base64");

	let readStream = new stream.PassThrough();
	readStream.end(fileContents);

	res.set("Content-disposition", "inline; filename=" + "Resumen_proceso.pdf");
	res.set("Content-Type", "application/pdf");

	readStream.pipe(res);
};

module.exports = {
	loadDocument,
	downloadFile,
	previewFile,
};
