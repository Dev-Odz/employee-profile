const { Department } = require("../models");
const AppError = require("../utils/AppError");

const getAllDepartments = async () => {
	try {
		const departments = await Department.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});

		if (!departments) {
			throw new AppError("No departments found", 404);
		}

		return departments;
	} catch (error) {
		throw error;
	}
};

const createDepartment = async (name) => {
	try {

        // Check if name is already exist in the database (case-insensitive)
        const existingDepartment = await Department.findOne({
            where: {
                name: {
                    [require("sequelize").Op.iLike]: name,
                },
            },
        });

        if (existingDepartment) {
            throw new AppError("Department already exists", 409);
        }

		const newDepartment = await Department.create({ name });

        if (!newDepartment) {
            throw new AppError("Failed to create department", 500);
        }

		return newDepartment;
	} catch (error) {
		throw error
	}
};

module.exports = {
	getAllDepartments,
	createDepartment,
};
