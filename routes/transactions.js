const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  deleteAllTransactions,
} = require('../controllers/transactions');
const authMiddleware = require('../middleware/auth');

router
  .route('/')
  .get(authMiddleware, getTransactions)
  .post(authMiddleware, addTransaction)
  .delete(authMiddleware, deleteAllTransactions);

router.route('/:id').put(editTransaction);

router.route('/:id').delete(deleteTransaction);

module.exports = router;
