(async () => {
	try {
		const db = require("../src/models");

		await db.sequelize.authenticate();

		console.log("DB NAME:", db.sequelize.config.database);
		console.log("HOST:", db.sequelize.config.host);

		const count = await db.Users.count();

		process.stdout.write(String(count));
	} catch (err) {
		console.error("COUNT ERROR:", err);
		process.exit(1);
	}
})();
