import * as Yup from 'yup'

const mobileRegex = /^[6-9][0-9]{9}$/

const loginSchema = Yup.object({
    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(
            mobileRegex,
            'Enter valid mobile number'
        ),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password should not exceed 12 characters'),
})

// Registration schema

const registrationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),

    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(
            mobileRegex,
            'Mobile number must be 10 digits and start with 6, 7, 8, or 9'
        ),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
    full_name: Yup.string()
        .required('Full name is required')
        .min(3, 'Full name must be at least 3 characters')
        .max(50, 'Full name is too long'),
})


export { loginSchema, registrationSchema }
