const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transactions');

router.route('/').get(getTransactions).post(addTransaction);

router.route('/:id').put(editTransaction);

router.route('/:id').delete(deleteTransaction);

module.exports = router;
