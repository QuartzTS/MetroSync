// The account of the person who's signed in (which is gonna be the admin)
import mongoose from "mongoose"; // Import dat mongoose


const personSchema = new mongoose.Schema({
	name: { // The name of the person.
		type: String,
		required: true,
		minLength: 2,
	},
	email: { // Their email.
		type: String,
		required: true,
		unique: true,
	},
	password: { // Their password.
		type: String,
		required: true,
		minLength: 8,
	},
	role: { // Their role
		type: String,
		enum: ["admin"], // Admin only (The democracy is very real lol..)
		default: "admin",
	},
	accountCreatedAt: { // When was this account made?
		type: Date,
		default: Date.now,
	},
	accountUpdatedAt: { // When was this account last updated?
		type: Date,
		default: Date.now,
	},
});

// Export the model of an admin's account.
export default mongoose.models.Person || mongoose.model("Person", personSchema);
