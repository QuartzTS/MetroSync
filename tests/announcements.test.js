// Import the request function
import request from "supertest";
// Our expressive application to test the endpoints
import app from "../app.js";
// The test is gonna need mongoose to be connected, so we're gonna have to import mongoose connection functions and the mongo URI to directly handle the connections here..
// (Not sure if there'sa better way than this..)
import { connect, disconnect } from "mongoose";
import { MONGO_URI } from "../config/config.js";

// The content to send
const content = "I'm gonna make an announcement-";
// The station we wanna send to
const stationId = "sadat"


beforeAll(async() => { // Connect before testing
	await connect(MONGO_URI);
});

afterAll(async() => { // Disconnect after the test is finished
	await disconnect();
});


// Pretty much self explanatory lol..
describe("POST /api/v1/stations/:id/announcements", () => {
	it("should return an error with status code 401 cuz we got no token lol", async() => {
		const res = await request(app).post(`/api/v1/stations/${stationId}/announcements`).send({ text: content });
		expect(res.status).toBe(401);
	});
});
