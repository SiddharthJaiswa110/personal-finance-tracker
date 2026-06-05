const Transaction = require("../models/transaction.model");

// ADD TRANSACTION
const addTransaction = async (req, res) => {

  try {

    const { title, amount, type, category, date } = req.body;

    // Validation
    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Create Transaction
    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      date
    });

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



const getTransactions = async (req, res) => {

  try {

    // Find logged-in user's transactions
    const transactions = await Transaction.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

const deleteTransaction = async (req, res) => {

  try {

    const transactionId = req.params.id;

    // Find transaction
    const transaction = await Transaction.findById(transactionId);

    // Check transaction exists
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found"
      });
    }

    // Verify ownership
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Delete transaction
    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

const updateTransaction = async (req, res) => {

  try {

    const transactionId = req.params.id;

    const {
      title,
      amount,
      type,
      category,
      date
    } = req.body;

    // Find transaction
    const transaction = await Transaction.findById(transactionId);

    // Check transaction exists
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found"
      });
    }

    // Verify ownership
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Update fields
    transaction.title = title || transaction.title;

    transaction.amount = amount || transaction.amount;

    transaction.type = type || transaction.type;

    transaction.category = category || transaction.category;

    transaction.date = date || transaction.date;

    // Save updated transaction
    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction
};


