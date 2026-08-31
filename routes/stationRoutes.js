// Our totally expressive framework..
import e from "express";

// Import all needed functions.
import { getAllStations, getAllAnnouncementsInStation } from "../controllers/stationController.js";
import { postAnnouncement } from "../controllers/announcementController.js";
import { announcementBodyValidator, announcementQueryValidator } from "../middleware/announcementValidator.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

// WiFi router (lol)
const stationRouter = e.Router();


// POST route for posting an announcement. (admin only)
stationRouter.post("/:id/announcements", requireAdmin, announcementBodyValidator, postAnnouncement);

// GET route for getting all stations.
stationRouter.get("/", getAllStations);

// GET route for getting all announcements in a station.
stationRouter.get("/:id/announcements", announcementQueryValidator, getAllAnnouncementsInStation);

export default stationRouter;
