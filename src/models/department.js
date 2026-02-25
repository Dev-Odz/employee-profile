"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Department.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 50],
				},
			},
		},
		{
			sequelize,
			modelName: "Department",
			tableName: "Departments",
		},
	);

	Department.associate = (models) => {
		Department.hasMany(models.Users, {
			foreignKey: "departmentId",
			as: "users",
		});
	};
	return Department;
};
