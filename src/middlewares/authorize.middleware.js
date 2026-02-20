const AppError = require("../utils/AppError");

const authorizeRole = (requiredRole) => {
	// requiredRole type should be a string. How? We can enforce this by adding a check at the beginning of the function. If the requiredRole is not a string, we can throw an error. Here's how you can implement this:

	if (typeof requiredRole !== "string") {
		throw new Error("Required role must be a string");
	}

	if (!requiredRole) {
		throw new Error("Required role is missing");
	}

	if (requiredRole.trim() === "") {
		throw new Error("Required role cannot be an empty string");
	}

	return (req, res, next) => {
		try {
            // Where did we get the user role from? We can get the user role from the req.user object, which is typically set by the authentication middleware after verifying the JWT token. The req.user object should contain the user's information, including their role. Here's how you can access it:
			const userRole = req.user.role;

			console.log(`userRole: ${userRole}`);
			console.log(`requiredRole: ${requiredRole}`);


			if (userRole !== requiredRole) {
				return next(new AppError("Unauthorized access", 403));
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};

module.exports = { authorizeRole };
