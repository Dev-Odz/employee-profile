require("dotenv").config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

const { Client } = require("pg");

const waitForDb = async () => {
	let retries = 10;

	while (retries) {
		try {
			const client = new Client({
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_NAME,
			});
			await client.connect();
			await client.end();

			console.log("✅ PostgreSQL is ready!");
			return;
		} catch (err) {
			console.log("❌ Could not connect to DB: ", err.message);
			console.log("⏳ Waiting for PostgreSQL...");
			retries--;

			await new Promise((res) => setTimeout(res, 3000));
		}
	}

	throw new Error("❌ Could not connect to DB");
};

waitForDb();
