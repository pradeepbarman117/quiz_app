const Joi = require('joi');

// ============================================
// USER VALIDATION SCHEMAS
// Path: validators/user/user.validator.js
// ============================================


const userRegSchema = Joi.object({
    mobile: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            'string.pattern.base': 'Mobile number must be 10-15 digits',
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required'
        }),

    password: Joi.string()
        .min(8)
        .max(50)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must not exceed 50 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),

    // confirm_password: Joi.string()
    //     .valid(Joi.ref('password'))
    //     .required()
    //     .messages({
    //         'any.only': 'Passwords do not match',
    //         'string.empty': 'Confirm password is required',
    //         'any.required': 'Confirm password is required'
    //     }),

    full_name: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.min': 'Full name must be at least 2 characters',
            'string.max': 'Full name must not exceed 100 characters',
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required'
        }),

    username: Joi.string()
        .pattern(/^[a-zA-Z0-9_-]{3,50}$/)
        .trim()
        .optional()
        .messages({
            'string.pattern.base': 'Username must be 3-50 characters (letters, numbers, _, -)',
        }),
})

module.exports = userRegSchema;