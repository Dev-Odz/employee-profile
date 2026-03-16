require("dotenv").config();

const request = require("supertest");
const db = require("../models");
const app = require("../app");

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
