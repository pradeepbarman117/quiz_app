const Joi = require('joi');

// Middleware to validate incoming requests based on Joi schema
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));

            return res.status(400).json({
                errors: errorMessages,
            });
        }

        next();
    };
};

module.exports = validateRequest;