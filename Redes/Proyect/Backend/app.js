require("dotenv").config();

const Server = require("./models/server");
const server = new Server();
const check = server.listen();

module.exports = check;
