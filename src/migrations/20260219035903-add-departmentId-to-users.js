"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Users", "departmentId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Departments",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Users", "departmentId");
	},
};
