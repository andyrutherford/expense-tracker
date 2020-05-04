// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @accss  Public
exports.getTransactions = (req, res, next) => {
  res.send('Get transactions...');
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @accss  Public
exports.addTransaction = (req, res, next) => {
  res.send('Add transaction...');
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @accss  Public
exports.deleteTransaction = (req, res, next) => {
  res.send('Delete transaction...');
};
