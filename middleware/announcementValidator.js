// Import request fields to validate
import { body, query } from "express-validator";


// Validate the request body
export const announcementBodyValidator = [
	body("text").notEmpty().withMessage("You should give your announcement some content")
		.isLength({ max: 2500 }).withMessage("Typing more than 2500 letters for an announcement is insane, right?").trim().escape(),
];

// Validate the request query string
export const announcementQueryValidator = [
	query("page").optional()
		.isInt({ min: 1 }).withMessage("Are you sure this is a page number? Only positive integers are allowed"),
	query("limit").optional()
		.isInt({ min: 1, max: 100 }).withMessage("Give me the number of announcements that should be shown in a page with the limit of 1-100"),
];
