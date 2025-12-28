const { login } = require('../../controllers/auth/auth.controller');

const router = require('express').Router();



router.post('/login', login);
// router.post('/logout', authenticate, authController.logout);
// router.post('/refresh-token', authController.refreshToken); 


module.exports = router;