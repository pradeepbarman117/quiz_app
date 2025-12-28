const router = require('express').Router();


const validateRequest = require('../middlewares/vallidateRequest');
// USER ROUTES
// ============================================
const registration = require('./user/user.routes');
const login = require('./auth/auth.routes');
// ============================================

// Mount user registration routes
router.use('/auth', registration);
router.use('/auth/', login);


module.exports = router;

















