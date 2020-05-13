const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @accss  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    await res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @accss  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create({
      text,
      amount,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        sucess: false,
        error: 'Server error',
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @accss  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        sucess: false,
        error: 'Server error',
      });
    }
  }
};

// @desc    Edit transaction
// @route   PUT /api/v1/transactions/:id
// @accss   Public
exports.editTransaction = async (req, res, next) => {
  const id = req.params.id;
  const { amount, text } = req.body;

  const transactionFields = {};
  if (text) transactionFields.text = text;
  if (amount) transactionFields.amount = amount;
  try {
    let transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    }

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: transactionFields },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
