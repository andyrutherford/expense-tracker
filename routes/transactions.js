const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transactions');
const authMiddleware = require('../middleware/auth');

router.route('/').get(getTransactions).post(authMiddleware, addTransaction);

router.route('/:id').put(editTransaction);

router.route('/:id').delete(deleteTransaction);

module.exports = router;
