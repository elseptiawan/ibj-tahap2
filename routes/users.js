var express = require('express');
var router = express.Router();
const {
  index,
  show,
  signup,
  login,
  changePassword,
  editName,
  destroy
} = require('../controllers/UserController');
const {checkDuplicateEmail} = require('../middleware/verifySignup');
const {verifyToken, isAdmin, isUser} = require('../middleware/authJWT');

router.get('/', verifyToken, isAdmin, index);
router.get('/:id', verifyToken, isAdmin, show);
router.post('/signup', checkDuplicateEmail, signup);
router.post('/login', login);
router.put('/change-password', verifyToken, isUser, changePassword);
router.put('/edit-name', verifyToken, isUser, editName);
router.delete('/:id', verifyToken, isAdmin, destroy);

module.exports = router;
