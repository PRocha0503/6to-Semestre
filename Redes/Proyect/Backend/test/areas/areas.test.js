// //During the test the env variable is set to test
// process.env.NODE_ENV = "test";
// const bcryptjs = require("bcryptjs");

// let mongoose = require("mongoose");
// let User = require("../../models/user");
// let Area = require("../../models/area")

// //Require the dev-dependencies
// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let check = require("../../app.js");
// let should = chai.should();

// chai.use(chaiHttp);

// let accessTokenAdmin = "";
// let accessTokenUser = "";


// //Our parent block
// describe("Areas Tests", () => {
// 	before((done) => {
// 		chai
// 			.request(check)
// 			.post("/api/auth/login")
// 			.send({ username: "admin", password: "test" })
// 			.end((err, res) => {
// 				res.should.have.status(200);
// 				const { accessToken: token } = res.body;
// 				accessTokenAdmin = token;
// 				done();
// 			});
// 	});
// 	/*
// 	 * Test create area
// 	 */
// 	describe("/POST/api/area/", () => {
// 		it("Admin should create area", (done) => {
// 			console.log(accessTokenAdmin);
// 			chai
// 				.request(check)
// 				.post("/api/area")
// 				.send({name: "Judicial" })
// 				.end((err, res) => {
// 					res.should.have.status(200);
// 					res.body.should.have.property("area");
// 					done();
// 				});
// 		});
// 		it("Admin should not add area", (done) => {
// 			console.log(accessTokenUser);
// 			chai
//                 .request(check)
//                 .post("/api/area")
//                 .send({name: "Judicial" })
// 				.end((err, res) => {
// 					res.should.not.have.status(200);
// 					res.body.should.have.property("msg");
// 					done();
// 				});
// 		});
// 	});
// });
