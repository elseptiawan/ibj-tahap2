var express = require('express');
var router = express.Router();
const {
    store,
    index,
    indexForUser,
    show,
    destroy
} = require('../controllers/UserCourseController');
const {verifyToken, isAdmin, isUser} = require('../middleware/authJWT');

router.get('/', verifyToken, isAdmin, index);
router.get('/my-class', verifyToken, isUser, indexForUser);
router.get('/:id', verifyToken, isAdmin, show);
router.post('/', verifyToken, isUser, store);
router.delete('/:id', verifyToken, isAdmin, destroy);

module.exports = router;