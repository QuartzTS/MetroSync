// The model for cool metro stations
import mongoose from "mongoose"; // Import da mongoose.


const stationSchema = new mongoose.Schema({
	id: { // The string ID of this station (for whatever reason..)
		type: String,
		required: true,
		unique: true, // No two stations can have same ID
		trim: true, // Remove spaces from start/end
	},
	name: { // Name of this station.
		type: String,
		required: true,
		minLength: 3,
		trim: true,
	},
	line: {
		type: Number,
		required: true,
		min: 1,
	},
	order: {
		type: Number,
		required: true,
		min: 0,
	},
	createdAt: { // When was this station created?
		type: Date,
		default: Date.now,
	},
	updatedAt: { // Is this even useful?
		type: Date,
		default: Date.now,
	},
});

// Export da model of this station.
export default mongoose.models.Station || mongoose.model("Station", stationSchema);
