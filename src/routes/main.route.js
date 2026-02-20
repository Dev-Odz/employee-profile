const { Router } = require("express");

const router = Router();

const mainRoute = router.get("/", (req, res) => {
	res.send("Welcome to the Employee Profile API");
});

module.exports = router;
