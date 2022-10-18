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
let newUser = "";

//Our parent block
describe("Create user tests", () => {
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
	 * Test the /POST route
	 */
	describe("/POST /users", () => {
		it("Admin should create user", (done) => {
			chai
				.request(check)
				.post("/api/user")
				.send({
					username: "test",
					password: "test",
				})
				.set("Cookie", `accessToken=${accessTokenAdmin}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("user");
					newUser = res.body.user;
					done();
				});
		});
		it("User should NOT create user", (done) => {
			chai
				.request(check)
				.post("/api/user")
				.send({
					username: "test",
					password: "test",
				})
				.set("Cookie", `accessToken=${accessTokenUser}`)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("message");
					done();
				});
		});
	});
	describe("/PUT /makeAdmin/:userId", () => {
		it("Admin should be able to make other admins", (done) => {
			chai
				.request(check)
				.put(`/api/user/makeAdmin/${newUser._id}`)
				.set("Cookie", `accessToken=${accessTokenAdmin}`)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
		it("User should NOT be able to make other admins", (done) => {
			chai
				.request(check)
				.put(`/api/user/makeAdmin/${newUser._id}`)
				.set("Cookie", `accessToken=${accessTokenUser}`)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
	describe(`/DELETE /api/user/${newUser._id}`, () => {
		it("Admin should be able delete user", (done) => {
			chai
				.request(check)
				.delete(`/api/user/${newUser._id}`)
				.set("Cookie", `accessToken=${accessTokenAdmin}`)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
		it("User should NOT be able to delete users", (done) => {
			chai
				.request(check)
				.delete(`/api/user/${newUser._id}`)
				.set("Cookie", `accessToken=${accessTokenUser}`)
				.end((err, res) => {
					res.should.not.have.status(200);
					done();
				});
		});
	});
});
