// JWT-related stuff for authorization
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
// Used to send an error if verification failed
import sendError from "../utils/errorSender.js";


// A middleware for routes that can only be accessed by cool admins
export function requireAdmin(req, res, next) {
	const headers = req.headers.authorization;
	if (!headers) { // If the header somehow has no token, then reject
		return res.status(401).send("You got no token! A valid token is required");
	}
	const token = headers.split(" ")[1];
	try { // Now that we've got the token, start authorization
		const adminDecoded = jwt.verify(token, JWT_SECRET);
		req.user = adminDecoded;
	} catch(error) { // If the token is invalid, then don't allow
		return sendError(next, error, "This token is invalid. Either you're not allowed, someone just tampered with it or your token got expired. Not cool..", 401);
	}
	if (req.user.role !== "admin") { // Lol, only admins can log in, but why not?
		return res.status(403).send("Sorry, you're not an admin here, somehow..");
	}
	next(); // NEXT!
}
