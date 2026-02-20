"use strict";
// what is 'use strict' in JavaScript?
// 'use strict' is a directive in JavaScript that enables strict mode. Strict mode is a way to opt in to a restricted variant of JavaScript, which can help catch common coding mistakes and "unsafe" actions such as defining global variables. When strict mode is enabled, it changes previously accepted "bad syntax" into real errors, and it also prevents certain actions from being taken. This can lead to more secure and optimized code.

const { Model, INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Users.init(
		{
			id: {
				type: INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			role: {
				type: DataTypes.STRING,
				defaultValue: "user",
				validate: {
					isIn: [["user", "admin"]],
				},
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Users",
			tableName: "Users",
			timestamps: true,
		},
	);

	Users.beforeCreate(async (user) => {
		const bcrypt = require("bcrypt");
		const saltRounds = 10;
		user.password = await bcrypt.hash(user.password, saltRounds);
	});

	Users.beforeUpdate(async (user) => {
		// where did the (user) parameter come from? The (user) parameter in the beforeUpdate hook is an instance of the Users model that is being updated. When you call the update method on a Users instance, Sequelize will trigger the beforeUpdate hook and pass the instance being updated as an argument to the hook function. This allows you to perform operations on the instance, such as hashing the password, before it is saved to the database.

		// update password only if it has been changed
		if (user.changed("password")) {
			const bcrypt = require("bcrypt");
			const saltRounds = 10;
			user.password = await bcrypt.hash(user.password, saltRounds);
		}
	});

	Users.associate = (models) => {
		Users.belongsTo(models.Department, {
			foreignKey: "departmentId",
			as: "department",
		});
	};

	return Users;
};
