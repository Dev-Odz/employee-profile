"use strict";

const bcrypt = require("bcrypt");
const { Users, Department, sequelize } = require("../models");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

// The line above calls the User model factory function with sequelize and DataTypes as arguments.
// This returns a model class that represents the 'users' table in the database.

const registerUser = async (name, email, password, role, departmentId) => {
	const transaction = await sequelize.transaction();

	try {
		const department = await Department.findByPk(departmentId, { transaction });
		if (!department) {
			throw new AppError("Department not found", 404);
		}

		// 1️⃣ Check existing email
		const existingUser = await Users.findOne({ where: { email } });
		if (existingUser) throw new Error("Email already exists");

		// 2️⃣ Create user
		const newUser = await Users.create(
			{
				name,
				email,
				password,
				role,
				departmentId,
			},
			{ transaction },
		);

		await transaction.commit();

		// Test transaction rollback here

		// what does it do? The code above performs the following steps to register a new user:
		// 1. It starts a new database transaction using sequelize.transaction().
		// 2. It checks if the provided departmentId exists in the Department table. If not, it throws a 404 error.
		// 3. It creates a new user in the Users table using the provided name, email, password, role, and departmentId. The transaction is used to ensure data consistency.
		// 4. It commits the transaction using await transaction.commit(). If any error occurs during the process, the transaction will be rolled back to maintain data integrity.

		// 3️⃣ Remove password from return
		const { password: _, ...safeUser } = newUser.toJSON();
		return safeUser;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getUsers = async (query) => {
	try {
		// Pagination
		const page = parseInt(query.page) || 1;
		const limit = parseInt(query.limit) || 10;
		const offset = (page - 1) * limit;

		// Filtering
		const where = {};

		if (query.name) {
			where.name = {
				[Op.iLike]: `%${query.name}%`, // case-insensitive search
			};
		}

		if (query.role) {
			where.role = query.role;
		}

		// Sorting
		const sortBy = query.sortBy || "createdAt";
		const order = query.order || "DESC";

		const users = await Users.findAndCountAll({
			where,
			limit,
			offset,
			order: [[sortBy, order]],
			attributes: { exclude: ["password"] }, // exclude password from results
			include: [
				{
					model: Department,
					as: "department",
					attributes: ["id", "name"],
				},
			],
		});

		return {
			total: users.count,
			page,
			limit,
			data: users.rows,
		};
	} catch (error) {
		throw error;
	}
};

const getUserById = async (id) => {
	try {
		const user = Users.findByPk(id, {
			attributes: { exclude: ["password"] },
		});

		return user;
	} catch (error) {
		throw error;
	}
};

const updateUserById = async (id, updateData) => {
	try {
		// use patch behavior to update only the fields provided in updateData
		const user = await Users.findByPk(id);
		if (!user) throw new Error("User not found");
		await user.update(updateData);

		// patch vs update: patch updates only the fields provided in updateData, while update replaces the entire record. In this case, we use patch behavior by only updating the fields that are included in updateData.
		// which one do you prefer? patch or update? I prefer patch because it allows for more flexible updates without requiring the client to send the entire user object, which can be more efficient and less error-prone.
		// which one is faster between patch and update? Generally, patch can be faster than update because it only modifies the specified fields, while update may involve more overhead if it needs to replace the entire record. However, the actual performance difference can depend on the database and the specific implementation of the ORM.
		return user;
	} catch (error) {
		throw error;
	}
};

const deleteUserById = async (id) => {
	try {
		const user = await Users.findByPk(id);
		if (!user) throw new Error("User not found");
		await user.destroy();
		return { message: "User deleted successfully" };
	} catch (error) {
		throw error;
	}
};

const loginUser = async (email, password) => {
	const user = await Users.findOne({ where: { email } });

	if (!user) {
		throw new AppError("Invalid email or password", 401);
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new AppError("Invalid email or password", 401);
	}

	const token = jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
	);

	return { user, token };
};

const updatePasswordById = async (id, newPassword) => {
	try {
		const user = await Users.findByPk(id);
		if (!user) throw new Error("User not found");
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await user.update({ password: hashedPassword });
		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	registerUser,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	loginUser,
	updatePasswordById,
};
