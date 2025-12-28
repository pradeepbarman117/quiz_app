const router = require('express').Router();
const { userController } = require('@controllers/user/user.controller');
const validateRequest = require('@middlewares/vallidateRequest');
const userRegSchema = require('@validator/user/user.reg.validator');
const { passport, authorizeRoles } = require('@config/passport');
const { ROLES } = require('../../config/roles');
const { authenticate } = require('@middlewares/auth.middleware');

// User Registration Route
router.post('/register',
    validateRequest(userRegSchema),
    userController.register
);


module.exports = router;