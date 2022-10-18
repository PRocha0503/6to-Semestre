//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const bcryptjs = require("bcryptjs");

let mongoose = require("mongoose");
let User = require("../../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let check = require("../../app.js");
let should = chai.should();

chai.use(chaiHttp);

let accessTokenAdmin = "";
let accessTokenUser = "";

//Our parent block
describe("User tests", () => {
	before((done) => {
		chai
			.request(check)
			.post("/api/auth/login")
			.send({ username: "admin", password: "test" })
			.end((err, res) => {
				res.should.have.status(200);
				const { accessToken: token } = res.body;
				accessTokenAdmin = token;
				done();
			});
	});
	before((done) => {
		chai
			.request(check)
			.post("/api/auth/login")
			.send({ username: "user", password: "test" })
			.end((err, res) => {
				const { accessToken: token } = res.body;
				accessTokenUser = token;
				done();
			});
	});
	/*
	 * Test the /GET route
	 */
	describe("/GET /api/user", () => {
		it("Admin should get all users", (done) => {
			chai
				.request(check)
				.get("/api/user")
				.set("Cookie", `accessToken=${accessTokenAdmin}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("users");
					done();
				});
		});
		it("User should NOT get all users", (done) => {
			chai
				.request(check)
				.get("/api/user")
				.set("Cookie", `accessToken=${accessTokenUser}`)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
