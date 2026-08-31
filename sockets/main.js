// Import function to save socket.io instance
import { setIo } from "./ioInstance.js";

// Tracks the view count in memory
let viewerCount = new Map();
// Tracks the station we joined, useful for updating the viewer count when disconnecting (idk if there's a better option..)
let currentStation = null;


// Main function to set up all socket events
export default function setupSockets(io) {
	// Save io instance so other files can use it
	setIo(io);

	// Listen for new socket connections
	io.on("connection", (socket) => {
		console.log(`${socket.id} is now successfully connected!`);

		// When user joins a station room
		socket.on("joinStation", (stationId) => {
			// Add this socket to the station room
			socket.join(stationId);
			// Track the current station
			currentStation = stationId;
			// Count how many people are watching this station
			const watchers = incrementViewerCount(stationId);
			// Tell everyone in the room how many watchers there are
			io.to(stationId).emit("presenceUpdate", { stationId, watchers });
			console.log(`${socket.id} joined the ${stationId} station, now the viewer count in this station is ${watchers}`);
		});

		// When user leaves a station room
		socket.on("leaveStation", (stationId) => {
			// Remove this socket from the station room
			socket.leave(stationId);
			// Count remaining watchers
			const watchers = decrementViewerCount(stationId);
			// Update everyone with new watcher count
			io.to(stationId).emit("presenceUpdate", { stationId, watchers });
			console.log(`${socket.id} left the ${stationId} station, now the viewer count in this station is ${watchers}`);
		});

		// When socket disconnects (user closes browser/tab)
		socket.on("disconnect", () => {
			if (currentStation !== null) { // If we disconnected while in a station, then update view count
				const stationId = currentStation;
				// Count remaining watchers
				const watchers = decrementViewerCount(stationId);
				// Update everyone with new watcher count
				io.to(stationId).emit("presenceUpdate", { stationId, watchers });
				currentStation = null; // This, so that nobody messes with the view count by restarting multiple times
			}
			console.log(`${socket.id} has been disconnected!`);
		});
	});
}

// Returns incremented viewer count
function incrementViewerCount(stationId) {
	const currentCount = viewerCount.get(stationId) || 0;
	viewerCount.set(stationId, currentCount + 1);
	return viewerCount.get(stationId);
}

// Returns decremented viewer count
function decrementViewerCount(stationId) {
	const currentCount = viewerCount.get(stationId) - 1;
	if (currentCount <= 0) {
		viewerCount.delete(stationId);
	} else {
		viewerCount.set(stationId, currentCount);
	}
	return currentCount || 0;
}

// This is an alternative method that I found through Google, and I think it might be better?
// function displayCurrentCountViaAdapter(stationId) {
	// const station = io.sockets.adapter.rooms.get(stationId);
	// return station ? station.size : 0;
// }
