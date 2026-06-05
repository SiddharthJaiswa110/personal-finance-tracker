

const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");

const transactionRoutes = require("./transaction.routes");

const dashboardRoutes = require("./dashboard.routes");

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy"
  });
});

router.use("/auth", authRoutes);

router.use("/transactions", transactionRoutes);

router.use("/dashboard", dashboardRoutes);

module.exports = router;