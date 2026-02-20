const {
	registerUser,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	loginUser,
} = require("../services/auth.service");

const AppError = require("../utils/AppError");

const createUserController = async (req, res) => {
	// The controller handles the logic for creating a new user based on the request data. This includes validating the input, hashing the password, saving the user to the database, and sending an appropriate response back to the client. Error handling is also crucial to ensure that any issues during the registration process are properly managed and communicated.

	const { name, email, password, role, departmentId } = req.body;

	// Call the service to register the user
	registerUser(name, email, password, role, departmentId)
		.then((user) => {
			res.status(201).json({
				id: user["id"],
				success: true,
				message: "User registered successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({ error: error.message });
		});
};

const getUsersController = async (req, res, next) => {
	// This controller will handle the logic for retrieving all users from the database. It will call the appropriate service function to fetch the users and then send the response back to the client. Error handling will also be included to manage any issues that may arise during the retrieval process.

	try {
		const users = await getUsers(req.query);

		if (!users) {
			const error = new Error("Users not found");
			error.status = 404;
			next(error);

			// What does this 3 lines of code above do? These lines of code create a new Error object with the message "Users not found" and set the statusCode property of the error to 404. Then, the error is passed to the next middleware function in the Express.js request-response cycle using the next() function. This allows the error to be handled by an error-handling middleware, which can send an appropriate response back to the client based on the error's status code and message.
		}

		res.status(200).json({
			success: true,
			status: 200,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error) {
		next(error); // Pass the error to the error handling middleware
	}
};

const getUserByIdController = async (req, res, next) => {
	// This controller will handle the logic for retrieving a single user by their ID. It will extract the user ID from the request parameters, call the appropriate service function to fetch the user, and then send the response back to the client. Error handling will also be included to manage any issues that may arise during the retrieval process.

	try {
		const { id } = req.params;
		const user = await getUserById(id);

		if (!user) {
			return next(new AppError("User not found", 404));
		}

		res.status(200).json({
			data: user,
			message: "User retrieved successfully",
			status: 200,
			success: true,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUserByIdController = (req, res) => {
	// This controller will handle the logic for updating a user's information based on their ID. It will extract the user ID from the request parameters and the updated data from the request body. The controller will then call the appropriate service function to perform the update and send the response back to the client. Error handling will also be included to manage any issues that may arise during the update process.

	try {
		const { id } = req.params;
		const updateData = req.body;
		updateUserById(id, updateData)
			.then((updatedUser) => {
				if (!updatedUser) {
					return res.status(404).json({
						success: false,
						status: 404,
						error: "User not found",
					});
				}
				res.status(200).json({
					data: updatedUser,
					message: "User updated successfully",
					status: 200,
					success: true,
				});
			})
			.catch((error) => {
				res.status(500).json({
					status: error.status || 500,
					error: error.message,
				});
			});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteUserByIdController = (req, res) => {
	// This controller will handle the logic for deleting a user based on their ID. It will extract the user ID from the request parameters, call the appropriate service function to perform the deletion, and then send the response back to the client. Error handling will also be included to manage any issues that may arise during the deletion process.

	try {
		const { id } = req.params;

		deleteUserById(id)
			.then((result) => {
				res.status(204).json({
					message: result.message,
					status: 204,
					success: true,
				});
				// why do we use 204 status code for delete operation? The 204 No Content status code is used to indicate that the server has successfully processed the request and that there is no content to send in the response. In the context of a delete operation, it signifies that the resource has been successfully deleted and that there is no additional information to return to the client. This is a common practice in RESTful APIs to indicate a successful deletion without returning any content.
				// can we use 200 status code for delete operation? Yes, you can use a 200 OK status code for a delete operation if you want to return a response body with additional information about the deletion. However, using a 204 No Content status code is more appropriate when there is no content to return, as it clearly indicates that the resource has been deleted without any additional data. Using 200 OK may imply that there is content in the response, which can be misleading if the response body is empty.
			})
			.catch((error) => {
				res.status(500).json({
					status: error.status || 500,
					error: error.message,
				});
			});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const loginUserController = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const result = await loginUser(email, password);

		res.status(200).json({
			success: true,
			status: 200,
			token: result.token,
			user: {
				id: result.user.id,
				name: result.user.name,
				email: result.user.email,
				role: result.user.role,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createUserController,
	getUsersController,
	getUserByIdController,
	updateUserByIdController,
	deleteUserByIdController,
	loginUserController,
};
