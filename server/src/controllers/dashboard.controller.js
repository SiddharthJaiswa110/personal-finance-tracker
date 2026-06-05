const Transaction = require("../models/transaction.model");

const getDashboardData = async (req, res) => {

  try {

    // Get user's transactions
    const transactions = await Transaction.find({
      user: req.user.id
    });

    // Calculate totals
    let totalIncome = 0;

    let totalExpense = 0;

    transactions.forEach((transaction) => {

      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }

    });

    // Current Balance
    const totalBalance = totalIncome - totalExpense;

    // Recent Transactions
    const recentTransactions = await Transaction.find({
      user: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpense,
        totalBalance
      },

      recentTransactions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

const getCategoryAnalytics = async (req, res) => {

  try {

    // Get only expense transactions
    const expenses = await Transaction.find({
      user: req.user.id,
      type: "expense"
    });

    // Category totals object
    const categoryMap = {};

    expenses.forEach((expense) => {

      const category = expense.category;

      if (categoryMap[category]) {
        categoryMap[category] += expense.amount;
      } else {
        categoryMap[category] = expense.amount;
      }

    });

    // Convert object to array
    const categoryData = Object.keys(categoryMap).map((category) => ({
      category,
      total: categoryMap[category]
    }));

    res.status(200).json({
      success: true,
      categoryData
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

const getMonthlyAnalytics = async (req, res) => {

  try {

    // Get all user transactions
    const transactions = await Transaction.find({
      user: req.user.id
    });

    // Month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    // Monthly data map
    const monthlyMap = {};

    transactions.forEach((transaction) => {

      const date = new Date(transaction.date);

      const month = months[date.getMonth()];

      // Create month if not exists
      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          income: 0,
          expense: 0
        };
      }

      // Add income or expense
      if (transaction.type === "income") {
        monthlyMap[month].income += transaction.amount;
      } else {
        monthlyMap[month].expense += transaction.amount;
      }

    });

    // Convert object to array
    const monthlyData = Object.keys(monthlyMap).map((month) => ({
      month,
      income: monthlyMap[month].income,
      expense: monthlyMap[month].expense
    }));

    res.status(200).json({
      success: true,
      monthlyData
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
  getDashboardData,
  getCategoryAnalytics,
  getMonthlyAnalytics
};