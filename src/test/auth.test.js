const request = require("supertest");
const db = require("../models/users");
const app = require("../app"); // your express app

describe("Auth API", () => {
	it("should reject invalid login", async () => {
		const res = await request(app).post("/auth/login").send({
			email: "fake@email.com",
			password: "wrongpass",
		});

		expect(res.statusCode).toBe(401);
	});
});

afterAll(async () => {
	await db.sequelize.close();
});
