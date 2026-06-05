const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction
} = require("../controllers/transaction.controller");

// Add Transaction
router.post("/", authMiddleware, addTransaction);

// Get Transactions
router.get("/", authMiddleware, getTransactions);

// Update Transaction
router.put("/:id", authMiddleware, updateTransaction);

// Delete Transaction
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;