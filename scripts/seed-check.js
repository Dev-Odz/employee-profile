(async () => {
	try {
		const db = require("../src/models");

		await db.sequelize.authenticate();

		const count = await db.Users.count();

		console.log(count); // use log here, not stdout.write
	} catch (err) {
		console.error("COUNT ERROR:", err);
		process.exit(1);
	}
})();
