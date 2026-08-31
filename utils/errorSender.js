// Sends the name and message of an error to the central error middleware, along with a custom status cause message..
export default function sendError(next, error, cause = "", status = 500) {
	next({
		name: error.name,
		message: error.message,
		cause: cause,
		status: status,
	});
}
