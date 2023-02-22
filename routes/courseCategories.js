var express = require('express');
var router = express.Router();
const {
    store,
    update,
    index,
    show,
    destroy
} = require('../controllers/CourseCategoryController');
const {verifyToken, isAdmin} = require('../middleware/authJWT');

router.get('/', verifyToken, isAdmin, index);
router.get('/:id', verifyToken, isAdmin, show);
router.post('/', verifyToken, isAdmin, store);
router.put('/:id', verifyToken, isAdmin, update);
router.delete('/:id', verifyToken, isAdmin, destroy);

module.exports = router;