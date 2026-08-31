// The http module itself (nobody tell em that I don't like it lo-)
import http from "http";
// Import our expressive application.
import app from "./app.js";
// The Worm.io server /j
import { Server } from "socket.io";
// Import environment variables.
import { SERVER_PORT, MONGO_URI } from "./config/config.js";
// Import database connection function.
import connectDatabase from "./db/database.js";
// This exists to plant a document of an admin in the soil of the database (Plants are cool)
import { ensureAdminSeed } from "./services/authService.js";
// Import the function for socket connection
import setupSockets from "./sockets/main.js";

// Make a very expressive server out of this application..
const httpServer = http.createServer(app);
// Make the socket.io thing
const io = new Server(httpServer);
// Plug the socket in and BAM, WELCOME TO THE INTERNET!!
setupSockets(io);

// Connect this database
connectDatabase(MONGO_URI).then(() => {
	ensureAdminSeed(); // Plant a document of an account for a totally super cool admin first (unless they're already here)
	httpServer.listen(SERVER_PORT, () => { // After the database is successfully connected, our http server should be all ears..
		console.log(`This server be zoomin' on http://localhost:${SERVER_PORT}`);
	});
});
