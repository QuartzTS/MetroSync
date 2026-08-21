// E for expressive.
const e = require("express");

// Task X: Add socket io for the announcements

// Import environment variables.
const { SERVER_PORT, NODE_ENV, MONGO_URI } = require("./config/config");
// Import database connection functions.
const { connectDatabase, disconnectDatabase } = require("./db/database");

// Start this very expressive server..
const app = e();

// Turn every input into a JSON.
app.use(e.json());

// Greet ppl with a cool message when they enter the main page.
app.get("/", (req, res) => {
	console.log("Vroom!!");
	res.status(200).send("Hope ya enjoy da ride!");
});

// Add a health endpoint to ensure that the server is working
app.get("/health", (req, res) => {
	res.status(200).json({
		"status": "Healthy and ready to zoom in!",
		"anything-else": "Nope, thank you!",
	});
});

// A central error middleware (I'm thinking of making an AppError custom class later..)
app.use((error, req, res, next) => { // Send an input status with 500 as a fallback, and then send name, message and custom cause message of the error JSON.
	res.status(error.status || 500).json({
		name: error.name || "UnexpectedError",
		message: error.message || "Whoa, that was unexpected..",
		cause: error.cause || "There's a weird bug in this server.",
	});
});

// Connect this database
connectDatabase(MONGO_URI).then(() => {
	app.listen(SERVER_PORT, () => { // After the database is successfully connected, our application should be all ears..
		console.log(`This server be zoomin' on port ${SERVER_PORT}..`);
	});
});
