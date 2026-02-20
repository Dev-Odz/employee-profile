const Joi = require("joi");

const userIdParamSchema = Joi.object({
	params: Joi.object({
		id: Joi.number().integer().required(),
	}),
	body: Joi.optional(),
	query: Joi.optional(),
});

const getUserSchema = Joi.object({
	query: Joi.object({
		page: Joi.number().integer().min(1).default(1),
		limit: Joi.number().integer().min(1).max(100).default(10),
		name: Joi.string().optional(),
		role: Joi.string().valid("admin", "user").optional(),
		sortBy: Joi.string().valid("id", "name", "role", "createdAt").optional(),
		order: Joi.string().valid("ASC", "DESC").optional(),
	}),
	params: Joi.optional(),
	body: Joi.optional(),
});

module.exports = {
	userIdParamSchema,
	getUserSchema,
};
