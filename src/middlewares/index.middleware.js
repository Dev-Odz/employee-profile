const { authenticateToken } = require("./auth.middleware");
const { authorizeRole } = require("./authorize.middleware");
const validateSchema = require("./joiValidate.middleware");
const errorHandler = require("./error.middleware");

module.exports = {
	authenticateToken,
	authorizeRole,
	validateSchema,
	errorHandler,
};
