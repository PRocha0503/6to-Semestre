const Document = require("../models/document");
const stream = require("stream");
const { parseQuery } = require("../utils/parseQuery");

const addDocument = async (req, res) => {
	try {
		const { title, folio, expediente, createdAt, area, tags, metadata } =
			req.body;

		const createdBy = req.user;
		const document = new Document({
			title,
			folio,
			expediente,
			createdAt,
			createdBy,
			area,
			tags,
			metadata,
		});
		document.logs = [req.log];
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

//Function to add a file to a document
const loadDocument = async (req, res) => {
	try {
		//Get file and details
		let { file } = req.files;
		file = file.data;
		const size = file.length; //In bytes

		//Get document and add new data
		const document = req.doc;
		document.logs = [req.log];
		document.size = size;
		document.file = file;

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
					message: e || "Internal server error",
				});
		}
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

const getDocumentDetails = async (req, res) => {
	try {
		const { id: _id } = req.params;
		const doc = await Document.findOne(
			{ _id, area: { $in: [...req.user.areas] }, area: { $ne: null } },
			"-file"
		).populate("createdBy");
		res.json(doc);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

const getDocuments = async (req, res) => {
	try {
		console.log(req.user.areas);
		const documents = await Document.find(
			{
				area: { $in: [...req.user.areas] },
				area: { $ne: null },
			},

			"-file"
		).populate("createdBy");
		res.json(documents);
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

const queryDocuments = async (req, res) => {
	console.log(req.query);
	try {
		if (req.query.query === undefined || req.query.query === "") {
			console.log("No query");
			const documents = await Document.find(
				{ area: { $in: [...req.user.areas] }, area: { $ne: null } },
				"-file"
			).populate("createdBy");
			res.json({ documents });
			return;
		}

		// check cache
		// const cache = await redis.get(req.query.query);

		const parsedQueries = parseQuery(req.query.query);

		// add validations for each query
		const documents = await Document.find(
			{
				area: { $in: [...req.user.areas] },
				area: { $ne: null },
				$and: parsedQueries.map((query) => {
					return {
						[query.key]: {
							[`$${query.operator}`]: query.value,
						},
					};
				}),
			},
			"-file"
		);

		// cache the query

		res.json({
			documents, // return only the id and title
		});

		return;
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
		return;
	}
};

module.exports = {
	addDocument,
	loadDocument,
	downloadFile,
	previewFile,
	getDocumentDetails,
	getDocuments,
	queryDocuments,
};
