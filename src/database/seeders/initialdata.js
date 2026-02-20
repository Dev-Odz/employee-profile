"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				name: "Odeh Mark Lozano",
				email: "odehmarklozano@yopmail.com",
				password:
					"$2a$12$CTOygOsfu2iCMBLxWzBWCe4ouvc2nr67B844xnQRAl0uJwxv1Kbzm",
				role: "admin",
				departmentId: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Ramel Alagdon",
				email: "ramelalagdon@yopmail.com",
				password:
					"$2a$12$CTOygOsfu2iCMBLxWzBWCe4ouvc2nr67B844xnQRAl0uJwxv1Kbzm",
				role: "admin",
				departmentId: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Employees", null, {});
	},
};
