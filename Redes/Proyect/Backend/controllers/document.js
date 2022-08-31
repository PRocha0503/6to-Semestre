const Document = require("../models/document");
const stream = require("stream");

//Function to add a suer to the database
const addDocument = async (req, res) => {
	try {
		//Get file and filename
		let { file } = req.files;
		const title = file.name;
		file = file.data;
		const createdBy = req.user;

		//Create document
		const document = new Document({ title, file, createdBy });

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
	console.log(documentName);
	const document = await Document.findOne({ title: documentName });
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
	console.log(documentName);
	const document = await Document.findOne({ title: documentName });
	let fileContents = Buffer.from(document.file, "base64");

	let readStream = new stream.PassThrough();
	readStream.end(fileContents);

	res.set("Content-disposition", "inline; filename=" + "Resumen_proceso.pdf");
	res.set("Content-Type", "application/pdf");

	readStream.pipe(res);
};

module.exports = {
	addDocument,
	downloadFile,
	previewFile,
};
