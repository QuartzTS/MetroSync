// The first functions creates a token and returns it along with the email and role, the second only finds the person by email
import { createToken, findPersonByEmail } from "../services/authService.js";
// This one is used to get the results of the validation
import { validationResult } from "express-validator";
// Used to send an error to the error handler
import sendError from "../utils/errorSender.js";


// Log in function
export async function loginAccount(req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) { // If there are errors, then send em
			return res.status(400).json({ errors: errors.array() });
		}
		const token = await createToken(req.body);
		res.status(200).send(token);
	} catch(error) {
		const person = await findPersonByEmail(req.body.email);
		if (person) {
			return sendError(next, error, "This password ain't correct. Try again!", 401);
		}
		return sendError(next, error, "This happened when trying to sign in. Pretty sure the email doesn't exist", 401);
	}
}
