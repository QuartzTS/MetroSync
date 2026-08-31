// I'm gonna make an announcement-
import mongoose from "mongoose";


const announcementSchema = new mongoose.Schema({
	text: { // Announcement text.
		type: String,
		required: true,
		maxLength: 2500,
	},
	stationId: { // Which station was this sent in?
		type: String,
		required: true,
	},
	createdAt: { // When was this announcement sent?
		type: Date,
		default: Date.now,
	},
});

// Export our announcement model.
export default mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
