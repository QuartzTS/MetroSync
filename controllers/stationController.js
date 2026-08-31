// One function to find and arrange stations
import { findAndArrangeStations } from "../services/stationService.js";
// Another one to find and arrange announcements in a station
import { findAndArrangeAnnouncements } from "../services/announcementService.js";
// Annother one that returns results of some validation
import { validationResult } from "express-validator";
// And one to send errors
import sendError from "../utils/errorSender.js";


// Gets all stations
export async function getAllStations(req, res, next) {
	try { // Ez, just get all stations and arrange em, then send em in an array..
		const stations = await findAndArrangeStations();
		res.status(200).json(stations);
	} catch(error) { // Otherwise, just send an error if smth unexpected happens..
		sendError(next, error, "This happened when trying get the stations.");
	}
}

// This gets all announcements in a station.
export async function getAllAnnouncementsInStation(req, res, next) {
	try { // Get announcements, arrange em and send em..
		const errors = validationResult(req);
		if (!errors.isEmpty()) { // If there are errors, then show
			return res.status(400).json({ errors: errors.array() });
		}
		const announcements = await findAndArrangeAnnouncements(req.query, req.params.id);
		res.status(200).json(announcements);
	} catch(error) { // Otherwise, just send an error if smth unexpected happens..
		sendError(next, error, "This happened when trying get the announcements in a station.");
	}
}
