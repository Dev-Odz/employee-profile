const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mainRoute = require("./routes/main.route");
const authRoute = require("./routes/auth.route");
const departmentRoute = require("./routes/department.route");
const errorHandler = require("./middlewares/error.middleware");

// Create Express app
const app = express();

// Middleware
const allowedOrigins = [
	"http://localhost:4200",
	"http://employee-frontend-app-6275.s3-website-ap-southeast-1.amazonaws.com",
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);
app.use(express.json());

// Routes
app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/department", departmentRoute);
app.get("/health", (req, res) => {
	res.status(200).send("OK");
});

// Error handler
app.use(errorHandler);

module.exports = app;
