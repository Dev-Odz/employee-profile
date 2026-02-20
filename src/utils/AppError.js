class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.status = statusCode; // match middleware
		this.name = "AppError";
	}
}

module.exports = AppError;
