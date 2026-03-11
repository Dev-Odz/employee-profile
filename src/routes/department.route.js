require("dotenv").config();

const { Router } = require("express");

const router = Router();

const {
	createDepartmentController,
	getAllDepartmentsController,
} = require("../controllers/department.controller");
const {
	validateSchema,
	authenticateToken,
	authorizeRole,
} = require("../middlewares/index.middleware");
const {
	createDepartmentSchema,
} = require("../validation/department.validation");

router.get("/", authenticateToken, getAllDepartmentsController);
router.post(
	"/",
	authenticateToken,
	validateSchema(createDepartmentSchema),
	authorizeRole("admin"),
	createDepartmentController,
);

module.exports = router;
