const Document = require("../models/document");
const Batch = require("../models/batch");
const stream = require("stream");
const { parseQuery } = require("../utils/parseQuery");
const { parseBatch } = require("../utils/parseBatch");
const XLSX = require("xlsx");
const {v4}  = require("uuid");
const { db } = require("../models/document");

const MaxSize = 10000000;

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

		// encrypt file

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
		const doc = await req.doc.populate("createdBy");
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
				{ area: { $ne: null , $in: [...req.user.areas] } },
				"-file"
			).populate("createdBy");
			res.json({ documents });
			return;
		}

		// check cache
		// const cache = await redis.get(req.query.query);

		const parsedQueries = parseQuery(req.query.query);

		console.log(req.user.areas)
		// add validations for each query
		const documents = await Document.find(
			{
				area: { $ne: null,  $in: [...req.user.areas] },
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

const getLogs = async (req, res) => {
	try {
		const doc = await req.doc.populate({
			path: "logs",
			populate: {
				path:"user"
			}
		});
		res.json({ logs: doc.logs });
	} catch (e) {
		console.log(e);
		res.status(400).send({
			e,
		});
	}
};

const batchDocuments = async (req, res) => {
	try {
		//Get file and details
		if (req.files?.file === undefined) {
			res.status(400).json({ message: "No file provided" });
			return;
		}

		let { file } = req.files;
		file = file.data;
		const size = file.length; //In bytes
		
		if (size > MaxSize) {
			res.status(400).json({ message: "File size too large" });
			return;
		}
		const workbook = XLSX.read(file, { type: "buffer" });
		const sheet_name_list = workbook.SheetNames;

		if (sheet_name_list.length === 0) {
			res.status(400).json({ message: "No sheets found" });
			return
		}

		if (sheet_name_list.length > 1) {
			res.status(400).json({ message: "Only one sheet allowed" });
			return
		}

		const sheet = workbook.Sheets[sheet_name_list[0]];

		const batch = new Batch({
			createdBy: req.user._id,
			area: req.user.areas[0] || null,
			name: sheet_name_list[0],
			size: size,
		})

		// validate json
		const documents = parseBatch(sheet, batch._id, {
			createdBy: req.user._id,
			logs: [req.log],
			area: req.user.areas[0] || null,
		});

		await batch.save();

		// save documents
		// session.startTransaction(); // needs to use replica set to enable feature, todo

		// error boundary for batch save
		try {
			const r = await Document.insertMany(documents,{ordered:false, writeConcern: { w: 1 }});
			await batch.updateOne({status: "success", items: r.length});
			res.json({ message: "Document uploaded successfully", batchId: batch._id });
			return 

		} catch (e) {
			// rollback documents in batch
			await Document.deleteMany({ batchId: batch._id });
			console.log(e);
			res.status(400).json({ message: `Batch write failed due to invalid documents` });
			// update batch status
			await batch.updateOne({ status: "failed" });
			return;
		}
	}

	catch(e) {
		console.log(e.message);
		res.status(500).send({
			message: "Internal server error",
		});
	}
};

const getBatches = async (req, res) => {
	try {
		console.log(req.user.areas);
		const batches = await Batch.find({area: { $in: [...req.user.areas] }});
		res.json({ batches });
	} catch (e) {
		console.log(e.message);
		res.status(500).send({
			message: "Internal server error",
		});
	}
};

const rollBackBatch = async (req, res) => {
	try {
		const batch = await Batch.findById(req.params.id);
		if (batch === null) {
			res.status(400).json({ message: "Batch not found" });
			return;
		}

		if (batch.status === "failed") {
			res.status(400).json({ message: "Batch already failed" });
			return;
		}

		if (batch.status === "rolledback") {
			res.status(400).json({ message: "Batch already rolledback" });
			return;
		}

		if (batch.status === "success") {
			await Document.deleteMany({ batchId: batch._id });
			await batch.updateOne({ status: "rolledback" });
			res.json({ message: "Batch rolled back successfully" });
			return;
		}

		res.status(400).json({ message: "Batch status unknown" });
		return;
	} catch (e) {
		console.log(e.message);
		res.status(500).send({
			message: "Internal server error",
		});
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
	getLogs,
	batchDocuments,
	getBatches,
	rollBackBatch
};
