// bootstrap.js

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV || "local"}`,
});

console.log(`Loaded environment: ${process.env.DB_NAME}`);

const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

const waitForDb = require("./wait-for-db");

// --- helpers ---
const runCommand = async (cmd, label) => {
	console.log(`🚀 ${label}...`);
	try {
		const { stdout, stderr } = await execAsync(cmd);

		if (stdout) console.log(stdout);
		if (stderr) console.error(stderr);

		console.log(`✅ ${label} done`);
	} catch (err) {
		console.error(`❌ ${label} failed`);
		console.error(err.message);
		process.exit(1); // stop everything if critical step fails
	}
};

// --- seed check ---
const getUserCount = async () => {
	try {
		const db = require("./src/models");
		await db.sequelize.authenticate();
		console.log("DB NAME:", db.sequelize.config.database);
		console.log("HOST:", db.sequelize.config.host);
		const count = await db.Users.count();
		return count;
	} catch (err) {
		console.error("❌ Failed to get user count:", err.message);
		return null;
	}
};

const seedIfNeeded = async () => {
	console.log("🔍 Checking if seed is needed...");

	let retries = 5;
	let count = null;

	while (retries--) {
		count = await getUserCount();

		if (count !== null) break;

		console.log("Retrying count...");
		await new Promise((res) => setTimeout(res, 1000));
	}

	if (count === 0 || count === null) {
		await runCommand("npx sequelize-cli db:seed:all", "Seeding data");
	} else {
		console.log("✅ Data already exists. Skipping seed...");
	}
};

// --- main bootstrap ---
(async () => {
	try {
		console.log("⏳ Waiting for DB...");
		await waitForDb();

		await runCommand("npx sequelize-cli db:migrate", "Running migrations");

		await seedIfNeeded();

		console.log("🔥 Starting app...");
		require("./src/server");
	} catch (err) {
		console.error("❌ Bootstrap failed:", err);
		process.exit(1);
	}
})();
