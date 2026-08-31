// The function that cooks the announcements
import { createAnnouncement } from "../services/announcementService.js";
// The function that sends the results of the validation
import { validationResult } from "express-validator";
// The function that sends the errors to the error handler
import sendError from "../utils/errorSender.js";


// This posts an announcement to a specific station.
export async function postAnnouncement(req, res, next) {
	try { // Simply make an announcement lol..
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const newAnnouncement = await createAnnouncement(req.body, req.params.id);
		res.status(201).json(newAnnouncement); // And then post!
	} catch(error) { // If smth wrong happens, then send an error.
		sendError(next, error, "This happened when trying to post an announcement.");
	}
}
