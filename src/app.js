const express = require("express");
const bodyParser = require("body-parser");

const mainRoute = require("./routes/main.route");
const authRoute = require("./routes/auth.route");
const departmentRoute = require("./routes/department.route");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/department", departmentRoute);

// Error handler
app.use(errorHandler);

module.exports = app;
