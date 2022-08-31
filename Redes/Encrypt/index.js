const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");
const uploads = multer({ dest: ".temp" });

const port = 8080;

app.get("/descargar", (req, res) => {
	let files = fs.readdirSync(__dirname + "/storage");
	res.render("descargar.ejs", { files });
});

app.get("/cargar", (req, res) => {
	res.render("cargar.ejs");
});

app.post("/descargar", (req, res) => {
	res.download(__dirname + "/storage/" + req.body.documentos, (err) => {
		console.log("ERROR", err);
	});
});
app.post("/cargar", uploads.single("archivo"), (req, res) => {
	let inputFS = fs.createReadStream(__dirname + "./temp/" + req.file.filename);
	let outputFS = fs.createWriteStream(
		__dirname + "/storage/" + req.body.nombre
	);
	const key = "aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbb";
	const iv = "eeeeeeeeeeeeeeee";
	let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

	inputFS.pipe(cipher).pipe(outputFS);
	outputFS.on("finish", () => {
		fs.unlinkSync(__dirname + "/.temp/" + req.file.filename);
	});
	res.render("cargar.ejs");
});

app.listen(port, () => {
	console.log(`Server is running in ${port}`);
});
