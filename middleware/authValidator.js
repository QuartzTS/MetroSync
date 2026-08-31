// We only need to validate the request body here
import { body } from "express-validator";


// Validate the body of da request
export const authBodyValidator = [
	body("email").notEmpty().withMessage("Your email is required to sign in")
		.isEmail().withMessage("Are you sure this is an email?").normalizeEmail().trim().escape(),
	body("password").notEmpty().withMessage("You have to enter your password to get in").trim().escape(),
];
