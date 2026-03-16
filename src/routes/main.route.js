const { Router } = require("express");

const router = Router();

const mainRoute = router.get("/", (req, res) => {
	res.send("Welcome to the Employee Profile API");
	console.log(`This is a test that the CI/CD pipeline is working correctly.`);
});

module.exports = router;
