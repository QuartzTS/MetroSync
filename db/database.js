// The module exports the functions for connecting and disconnecting the database..
import mongoose from "mongoose";


export default async function connectDatabase(uri) {
	try { // Try connecting to the database with the mongo URI entered as an argument.
		await mongoose.connect(uri);
		console.log("Connected to the database! Welcome aboard, passengers!");
	} catch(error) { // If smth wrong happened, then exit this stupid program.
		console.error(`Nope, smth wrong happened with connecting the database, the error that popped up is:\n${error}.`);
		process.exit(1);
	}
}
