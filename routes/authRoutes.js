// Our totally expressive framework..
import e from "express";

// Import all needed functions.
import { loginAccount } from "../controllers/authController.js";
import { authBodyValidator } from "../middleware/authValidator.js";

// WiFi router (lol)
const authRouter = e.Router();

// POST route for login
authRouter.post("/login", authBodyValidator, loginAccount);

export default authRouter;
