const { authenticateRoute } = require('../../middlewares/auth.middleware');

const router = require('express').Router();




router.get('/auth/validate-session', authenticateRoute, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Session is valid',
        data: {
            id: req.user.id,
            email: req.user.email,
            full_name: req.user.full_name,
            username: req.user.username,
            role: req.user.role
        }
    });
});

module.exports = router;