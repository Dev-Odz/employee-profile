const { Router } = require("express");
const {
	createUserController,
	getUsersController,
	getUserByIdController,
	updateUserByIdController,
	deleteUserByIdController,
	loginUserController,
} = require("../controllers/auth.controller");

const { registerSchema, loginSchema } = require("../validation/auth.validation");
const { userIdParamSchema, getUserSchema } = require("../validation/user.validation");

const { authenticateToken, authorizeRole, validateSchema } = require("../middlewares/index.middleware");

const router = Router();

router.post("/users", validateSchema(registerSchema), createUserController);
router.get("/users", authenticateToken, validateSchema(getUserSchema), getUsersController); // Get all users with optional query parameters for filtering, pagination, etc.
router.get("/users/:id", authenticateToken, validateSchema(userIdParamSchema), getUserByIdController);
router.put("/users/:id", authenticateToken, validateSchema(userIdParamSchema), updateUserByIdController);
router.delete(
	"/users/:id",
	authenticateToken,
	validateSchema(userIdParamSchema),
	authorizeRole("admin"),
	deleteUserByIdController,
);
router.post("/login", validateSchema(loginSchema), loginUserController);

module.exports = router;
