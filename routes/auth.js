const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const { loginUser, getUser, changePassword } = require('../controllers/auth');

router.route('/').get(authMiddleware, getUser);
router.route('/').put(authMiddleware, changePassword);
router.route('/').post(loginUser);

module.exports = router;
