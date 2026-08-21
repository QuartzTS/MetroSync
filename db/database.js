// The module exports the functions for connecting and disconnecting the database..
const mongoose = require("mongoose");


async function connectDatabase(uri) {
	try { // Try connecting to the database with the mongo URI entered as an argument.
		await mongoose.connect(uri);
		console.log("Connected to the database! Welcome aboard!");
	} catch (error) { // If smth wrong happened, then exit this stupid program.
		console.error(`Nope, smth wrong happened with connecting the database, the error that popped up is:\n${error}.`);
		process.exit(1);
	}
}

async function disconnectDatabase() {
	try { // Try to disconnect.
		await mongoose.disconnect();
		console.log("Disconnected! Cya later!");
	} catch(error) { // If smth wrong happened, then exit this stupid program.
		console.error(`Bruh, ${error.name} happened while trying to disconnect database, ${error.message}.`);
		process.exit(1);
	}
}

// Export the two functions.
module.exports = { connectDatabase, disconnectDatabase };
