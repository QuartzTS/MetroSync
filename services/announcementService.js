// Import the announcemect model, to do our database operations, obviously..
import Announcement from "../models/Announcement.js";
// This exists to sanitize requests.
import sanitize from "mongo-sanitize";
// Get the io thing to broadcast our announcement
import { getIo } from "../sockets/ioInstance.js";


// Create and return an announcement (and emit it to the current station room)
export async function createAnnouncement(data, stationId) {
	const sanitizedReq = sanitize(data);
	const announcement = await Announcement.create({
		text: sanitizedReq.text,
		stationId: stationId,
	});
	getIo().to(stationId).emit("announcement", announcement);
	return announcement;
}

// Find and arrange announcements
export async function findAndArrangeAnnouncements(query, stationId) {
	const sanitizedQuery = sanitize(query);
	const page = Number(sanitizedQuery.page) || 1;
	const limit = Number(sanitizedQuery.limit) || 10;
	const skip = (page - 1) * limit;
	return await Announcement.find({ stationId: stationId }).sort({ createdAt: -1 })
		.skip(skip).limit(limit);
}
