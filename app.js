// E for expressive.
import e from "express";
// Some stuff
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// Import some middleware
import rateLimiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorMiddleware.js";
// Now import our routes
import authRouter from "./routes/authRoutes.js";
import stationRouter from "./routes/stationRoutes.js";
// Unfortunately this environment variable doesn't really serve a purpose, so let's give it one..
import { NODE_ENV } from "./config/config.js";

// Get current file and directory paths (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make our very expressive application..
const app = e();

// Allow requests from other websites (CORS)
app.use(cors());

// Use that rate limiter, make sure it runs before our routes
app.use(rateLimiter);

// Turn every input into a JSON.
app.use(e.json());

// Serve static files (HTML, CSS, JS) from public folder
app.use(e.static(path.join(__dirname, "public")));

// A useless greeting message that no one will be able to normally see
app.get("/api/v1", (req, res) => {
	res.status(200).send("We hope you enjoy the ride!");
});

// Add a health endpoint to ensure that the server is working
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "Healthy and ready to zoom in!",
		environment: NODE_ENV,
		anythingElse: "Nope, thank you!",
	});
});

// Use the routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stations", stationRouter);

// A central error middleware
app.use(errorHandler);

// Export the application
export default app;
