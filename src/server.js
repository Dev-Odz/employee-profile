const app = require("./app");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

const PORT = 3000;

// Create a new Sequelize instance to test the database connection
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

// Test the database connection before starting the server
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
	})

	// .then is an asynchronous function that is called when the promise returned by sequelize.authenticate() is resolved. It logs a success message to the console if the database connection is successful.
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
