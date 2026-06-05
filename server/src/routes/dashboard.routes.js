const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getDashboardData,
  getCategoryAnalytics,
  getMonthlyAnalytics
} = require("../controllers/dashboard.controller");

// Dashboard Summary
router.get("/", authMiddleware, getDashboardData);

// Category Analytics
router.get("/categories", authMiddleware, getCategoryAnalytics);

// Monthly Analytics
router.get("/monthly", authMiddleware, getMonthlyAnalytics);

module.exports = router;