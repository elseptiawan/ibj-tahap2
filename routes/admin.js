var express = require('express');
var router = express.Router();
const {
    signup,
    login,
    changePassword
} = require('../controllers/AdminController');
const {checkDuplicateEmail} = require('../middleware/verifySignup');
const {verifyToken, isAdmin} = require('../middleware/authJWT');

router.post('/signup', checkDuplicateEmail, signup);
router.post('/login', login);
router.put('/change-password', verifyToken, isAdmin, changePassword);

module.exports = router;