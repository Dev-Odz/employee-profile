const Joi = require("joi");

const registerSchema = Joi.object({
	params: Joi.optional(),
	query: Joi.optional(),
	body: Joi.object({
		name: Joi.string().min(2).max(100).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		role: Joi.string().valid("user", "admin").default("user"),
		departmentId: Joi.number().integer().required(),
	}),
});

const loginSchema = Joi.object({
	params: Joi.optional(),
	query: Joi.optional(),
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});

module.exports = { registerSchema, loginSchema };
