const Joi = require("joi");

const createDepartmentSchema = Joi.object({
	body: Joi.object({
		name: Joi.string().min(3).max(50).required(),
	}),
	params: Joi.optional(),
	query: Joi.optional(),
});

module.exports = {
	createDepartmentSchema,
};
