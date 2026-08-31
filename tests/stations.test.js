// Import the request function
import request from "supertest";
// Our expressive application to test the endpoints
import app from "../app.js";
// The test is gonna need mongoose to be connected, so we're gonna have to import mongoose connection functions and the mongo URI to directly handle the connections here..
// (Not sure if there'sa better way than this..)
import { connect, disconnect } from "mongoose";
import { MONGO_URI } from "../config/config.js";


beforeAll(async() => { // Connect before testing
	await connect(MONGO_URI);
});

afterAll(async() => { // Disconnect after the test is finished
	await disconnect();
});


// Pretty much self explanatory lol..
describe("GET /api/v1/stations", () => {
	it("should get all seeded (or planted) stations with status code 200", async() => {
		const res = await request(app).get("/api/v1/stations");
		expect(res.status).toBe(200);
	});
});
