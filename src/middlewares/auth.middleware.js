const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authenticateToken = (req, res, next) => {
	console.log("Auth header:", req.headers["authorization"]);

	try {
		const authHeader = req.headers["authorization"];

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return next(new AppError("Invalid authorization format", 401));
		}

		// Format: Bearer TOKEN
		const token = authHeader.split(" ")[1];

		if (!token) {
			return next(new AppError("Invalid token format", 401));
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user info to request object
		req.user = decoded;

		next();
	} catch (error) {
		return next(new AppError("Invalid or expired token", 401));
	}
};

module.exports = { authenticateToken };
