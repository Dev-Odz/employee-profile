const departmentService = require("../services/department.service");
const AppError = require("../utils/AppError");

const getAllDepartmentsController = async (err, req, res, next) => {
	try {
		const departments = await departmentService.getAllDepartments();

		if (!departments) {
			throw new AppError("No departments found", 404);
		}

		res.status(200).json({
			success: true,
			status: 200,
			message: "Departments retrieved successfully",
			data: departments,
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};


const createDepartmentController = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newDepartment = await departmentService.createDepartment(name);

        if (!newDepartment) {
            throw new AppError("Failed to create department", 500);
        }

        res.status(201).json({
            success: true,
            status: 201,
            message: "Department created successfully",
            data: newDepartment,
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


module.exports = {
    getAllDepartmentsController,
    createDepartmentController,
};
