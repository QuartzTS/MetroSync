// Send an input status with 500 as a fallback, and then send name, message and custom cause message of the error JSON.
export default function errorHandler(error, req, res, next) {
	res.status(error.status || 500).json({
		name: error.name || "UnexpectedError",
		message: error.message || "There's a weird bug in this server.",
		cause: error.cause || "I can't fulfill this request",
	});
}