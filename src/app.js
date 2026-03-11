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
app.use(cors(
    {
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
));
app.use(express.json());

// Routes
app.use("/", mainRoute);
app.use("/auth", authRoute);
app.use("/department", departmentRoute);

// Error handler
app.use(errorHandler);

module.exports = app;
