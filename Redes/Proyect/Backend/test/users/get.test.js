//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let check = require("../../app.js");
let should = chai.should();
console.log(check);

chai.use(chaiHttp);

//Our parent block
describe("Should get users", () => {
	/*
	 * Test the /GET route
	 */
	describe("/GET users", () => {
		it("it should GET all the books", (done) => {
			chai
				.request(check)
				.get("/api/user")
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});
