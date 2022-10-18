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
mongoose.connect(process.env.MONGODB_TEST);

let accessToken = "";
//Our parent block
describe("Auth tests", () => {
	before((done) => {
		mongoose.connection.collections.users.drop(() => {
			console.log("Users collection dropped");
			done();
		});
	});
	before((done) => {
		const salt = bcryptjs.genSaltSync();
		const admin = new User({
			username: "admin",
			password: bcryptjs.hashSync("test", salt),
			isAdmin: true,
		});
		admin.save((err) => {
			done();
		});
	});
	before((done) => {
		const salt = bcryptjs.genSaltSync();
		const admin = new User({
			username: "user",
			password: bcryptjs.hashSync("test", salt),
		});
		admin.save((err) => {
			done();
		});
	});

	/*
	 * Test the /GET route
	 */
	describe("/POST /api/auth/login", () => {
		it("Should login user", (done) => {
			chai
				.request(check)
				.post("/api/auth/login")
				.send({ username: "admin", password: "test" })
				.end((err, res) => {
					res.should.have.status(200);
					const { accessToken: token } = res.body;
					accessToken = token;
					res.body.should.have.property("accessToken");
					res.body.should.have.property("refreshToken");
					done();
				});
		});
		it("Should get error with incorrect username", (done) => {
			chai
				.request(check)
				.post("/api/auth/login")
				.send({ username: "incorrect", password: "test" })
				.end((err, res) => {
					res.should.not.have.status(200);
					res.body.should.have.property("msg");

					done();
				});
		});
		it("Should get error with incorrect password", (done) => {
			chai
				.request(check)
				.post("/api/auth/login")
				.send({ username: "admin", password: "error" })
				.end((err, res) => {
					res.should.not.have.status(200);
					res.body.should.have.property("msg");

					done();
				});
		});
	});
	describe("/GET /api/auth/logged", () => {
		it("Should get logged user", (done) => {
			chai
				.request(check)
				.get("/api/auth/logged")
				.set("Cookie", `accessToken=${accessToken}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("username");
					done();
				});
		});
		it("Should get error with incorrect jwt", (done) => {
			chai
				.request(check)
				.get("/api/auth/logged")
				.set("Cookie", `accessToken=${"incorrect JWT"}`)
				.end((err, res) => {
					res.should.not.have.status(200);
					res.body.should.have.property("msg");
					done();
				});
		});
	});
});
