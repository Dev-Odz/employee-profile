const AppError = require("../utils/AppError");

const validate = (schema) => (req, res, next) => {
	const dataToValidate = {
		body: req.body,
		params: req.params,
		query: req.query,
	};

	const { error, value } = schema.validate(dataToValidate, {
		abortEarly: true,
	});

	if (error) {
		return next(new AppError(error.details[0].message.replace(/"/g, ""), 400));
	}

	// overwrite request with sanitized values
	req.body = value.body;
	req.params = value.params;
	req.query = value.query;

	next();
};

module.exports = validate;
