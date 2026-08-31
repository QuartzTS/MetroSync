// Rate limit
import rateLimit from "express-rate-limit";

// Make a rate limiter to prevent spamming requests
const rateLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 200,
	message: "Oops, got too many requests, lol.."
});

// Then export it!
export default rateLimiter;
