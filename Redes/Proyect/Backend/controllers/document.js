const Document = require("../models/document");

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

const download = async (request, response) => {
	const document = await Document.findOne({ title: "Resumen_proceso.pdf" });
	console.log(document);

	let fileContents = Buffer.from(document.file, "base64");

	let readStream = new stream.PassThrough();
	readStream.end(fileContents);

	response.set("Content-disposition", "attachment; filename=" + "test");
	response.set("Content-Type", "text/plain");

	readStream.pipe(response);
};

module.exports = {
	addDocument,
	download,
};
