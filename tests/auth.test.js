// Import the request function
import request from "supertest";
// Our expressive application to test the endpoints
import app from "../app.js";
// The test is gonna need mongoose to be connected, so we're gonna have to import mongoose connection functions and the mongo URI to directly handle the connections here..
// (Not sure if there'sa better way than this..)
import { connect, disconnect } from "mongoose";
import { MONGO_URI } from "../config/config.js";

// The login payload for the test
const loginPayload = { email: "quartzts@metrosync.com", password: "Souperstars!123" };


beforeAll(async() => { // Connect before testing
	await connect(MONGO_URI);
});

afterAll(async() => { // Disconnect after the test is finished
	await disconnect();
});


// Pretty much self explanatory lol..
describe("POST /api/v1/auth/login", () => {
	it("should return 200 and the expected token", async() => {
		const res = await request(app).post("/api/v1/auth/login").send(loginPayload);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("token");
	});
});
