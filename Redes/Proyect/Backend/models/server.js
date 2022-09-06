const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../db/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			user: "/api/user",
			auth: "/api/auth",
			docs: "/api/docs",
			perm: "/api/permission",
		};

		//Conectar a DB
		this.connectDB();
		//Middleware
		this.middlewares();
		//Routas de la aplicación
		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		//CORS
		this.app.use(
			cors({
				origin: true,
				credentials: true,
			})
		);
		this.app.options(
			"*",
			cors({
				origin: true,
				credentials: true,
			})
		);
		//Lectura y Parseo del body
		this.app.use(express.json());

		//Leer cookies
		this.app.use(cookieParser());
		//Archivos
		this.app.use(fileUpload());
	}
	routes() {
		this.app.use(this.paths.user, require("../routes/user"));
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.docs, require("../routes/document"));
		this.app.use(this.paths.perm, require("../routes/permission"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto ", this.port);
		});
	}
}

module.exports = Server;
